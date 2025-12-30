import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialLeads = [
  {
    id: 1,
    name: 'Farhan Ahmed',
    email: 'farhan.ahmed@email.com',
    phone: '+92 321 1234567',
    propertyInterest: '1 Kanal Villa in DHA',
    budget: '8 Crore - 10 Crore',
    status: 'new',
    priority: 'high',
    source: 'Website',
    message: 'Interested in scheduling a viewing',
    createdAt: '2024-12-05T10:30:00',
    lastContact: null,
  },
  {
    id: 2,
    name: 'Ayesha Khan',
    email: 'ayesha.khan@email.com',
    phone: '+92 333 2345678',
    propertyInterest: 'Apartment in Bahria Town',
    budget: '1.5 Crore - 2 Crore',
    status: 'contacted',
    priority: 'high',
    source: 'Referral',
    message: 'Looking for luxury apartments in Bahria Town Phase 8',
    createdAt: '2024-12-04T14:20:00',
    lastContact: '2024-12-05T09:15:00',
  },
  {
    id: 3,
    name: 'Usman Ali',
    email: 'usman.ali@email.com',
    phone: '+92 300 3456789',
    propertyInterest: '10 Marla House F-7',
    budget: '8 Crore - 12 Crore',
    status: 'qualified',
    priority: 'medium',
    source: 'Social Media',
    message: 'First-time buyer, bank loan approved',
    createdAt: '2024-12-03T16:45:00',
    lastContact: '2024-12-04T11:30:00',
  },
  {
    id: 4,
    name: 'Sana Malik',
    email: 'sana.malik@email.com',
    phone: '+92 311 4567890',
    propertyInterest: 'Plot in DHA Phase 9',
    budget: '3 Crore - 4 Crore',
    status: 'negotiating',
    priority: 'high',
    source: 'Website',
    message: 'Ready to make an offer',
    createdAt: '2024-12-02T09:00:00',
    lastContact: '2024-12-05T15:00:00',
  },
  {
    id: 5,
    name: 'Bilal Hassan',
    email: 'bilal.hassan@email.com',
    phone: '+92 345 5678901',
    propertyInterest: 'Office Space in Blue Area',
    budget: '4 Crore - 6 Crore',
    status: 'converted',
    priority: 'low',
    source: 'Walk-in',
    message: 'Contract signed!',
    createdAt: '2024-11-28T11:30:00',
    lastContact: '2024-12-01T10:00:00',
  },
]

const useLeadStore = create(
  persist(
    (set, get) => ({
      leads: initialLeads,
      
      // Add new lead
      addLead: (lead) => {
        const newLead = {
          ...lead,
          id: Math.max(...get().leads.map(l => l.id), 0) + 1,
          createdAt: new Date().toISOString(),
          lastContact: null,
          status: lead.status || 'new',
          priority: lead.priority || 'medium',
        }
        set((state) => ({
          leads: [newLead, ...state.leads]
        }))
        return newLead
      },
      
      // Update lead
      updateLead: (id, updates) => {
        set((state) => ({
          leads: state.leads.map(l =>
            l.id === id ? { ...l, ...updates } : l
          )
        }))
      },
      
      // Delete lead
      deleteLead: (id) => {
        set((state) => ({
          leads: state.leads.filter(l => l.id !== id)
        }))
      },
      
      // Update status
      updateStatus: (id, status) => {
        set((state) => ({
          leads: state.leads.map(l =>
            l.id === id ? { ...l, status, lastContact: new Date().toISOString() } : l
          )
        }))
      },
      
      // Update priority
      updatePriority: (id, priority) => {
        set((state) => ({
          leads: state.leads.map(l =>
            l.id === id ? { ...l, priority } : l
          )
        }))
      },
      
      // Get lead by id
      getLeadById: (id) => {
        return get().leads.find(l => l.id === parseInt(id))
      },
      
      // Get stats
      getStats: () => {
        const leads = get().leads
        return {
          total: leads.length,
          new: leads.filter(l => l.status === 'new').length,
          contacted: leads.filter(l => l.status === 'contacted').length,
          qualified: leads.filter(l => l.status === 'qualified').length,
          negotiating: leads.filter(l => l.status === 'negotiating').length,
          converted: leads.filter(l => l.status === 'converted').length,
          lost: leads.filter(l => l.status === 'lost').length,
        }
      },
      
      // Clear all (for testing)
      clearAll: () => set({ leads: [] }),
      
      // Reset to initial
      resetToInitial: () => set({ leads: initialLeads }),
    }),
    {
      name: 'lead-storage',
    }
  )
)

export default useLeadStore
