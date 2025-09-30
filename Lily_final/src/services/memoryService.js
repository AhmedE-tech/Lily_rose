// src/services/memoryService.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export class MemoryService {
  static async saveConversation(sessionId, userMessage, aiResponse) {
    const { data, error } = await supabase
      .from('conversations')
      .insert([
        {
          session_id: sessionId,
          user_message: userMessage,
          ai_response: aiResponse,
          timestamp: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Save conversation error:', error)
      // Fallback to localStorage
      this.saveToLocalStorage(sessionId, userMessage, aiResponse)
    }
    return data
  }

  static async getConversationHistory(sessionId) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true })

    if (error) {
      console.error('Get conversation error:', error)
      return this.getFromLocalStorage(sessionId)
    }
    return data || []
  }

  static saveToLocalStorage(sessionId, userMessage, aiResponse) {
    const key = `lily_conversation_${sessionId}`
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    existing.push({
      user_message: userMessage,
      ai_response: aiResponse,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem(key, JSON.stringify(existing.slice(-50))) // Keep last 50
  }

  static getFromLocalStorage(sessionId) {
    const key = `lily_conversation_${sessionId}`
    return JSON.parse(localStorage.getItem(key) || '[]')
  }
}