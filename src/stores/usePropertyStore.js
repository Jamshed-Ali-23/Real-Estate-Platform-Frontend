import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialProperties = [
  {
    id: 1,
    title: 'DHA Phase 6 Luxury Villa',
    price: 85000000,
    location: 'DHA Phase 6, Islamabad',
    type: 'Villa',
    status: 'active',
    views: 1245,
    leads: 28,
    bedrooms: 5,
    bathrooms: 6,
    sqft: 4500,
    featured: true,
    createdAt: '2024-10-15',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
    description: 'Stunning modern luxury villa with pool and garden'
  },
  {
    id: 2,
    title: 'Bahria Town Apartment',
    price: 18500000,
    location: 'Bahria Town Phase 8, Rawalpindi',
    type: 'Apartment',
    status: 'active',
    views: 986,
    leads: 22,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1800,
    featured: true,
    createdAt: '2024-10-20',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
    description: 'Luxurious apartment near Grand Mosque'
  },
  {
    id: 3,
    title: 'Clifton Penthouse',
    price: 150000000,
    location: 'Clifton Block 2, Karachi',
    type: 'Penthouse',
    status: 'pending',
    views: 876,
    leads: 18,
    bedrooms: 4,
    bathrooms: 5,
    sqft: 4000,
    featured: false,
    createdAt: '2024-11-01',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
    description: 'Sea-facing penthouse with stunning views'
  },
  {
    id: 4,
    title: 'F-7 Family Home',
    price: 95000000,
    location: 'F-7/2, Islamabad',
    type: 'House',
    status: 'sold',
    views: 654,
    leads: 12,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 2700,
    featured: false,
    createdAt: '2024-09-25',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
    description: 'Prime location house near Jinnah Super'
  },
  {
    id: 5,
    title: 'Bani Gala Farmhouse',
    price: 180000000,
    location: 'Bani Gala, Islamabad',
    type: 'Farmhouse',
    status: 'active',
    views: 543,
    leads: 15,
    bedrooms: 6,
    bathrooms: 7,
    sqft: 18000,
    featured: false,
    createdAt: '2024-11-10',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400',
    description: 'Magnificent farmhouse with mountain views'
  },
  {
    id: 6,
    title: 'Gulberg III Apartment',
    price: 35000000,
    location: 'Gulberg III, Lahore',
    type: 'Apartment',
    status: 'active',
    views: 421,
    leads: 9,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 950,
    featured: false,
    createdAt: '2024-11-12',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
    description: 'Stylish urban loft in trendy neighborhood'
  },
]

const usePropertyStore = create(
  persist(
    (set, get) => ({
      properties: initialProperties,
      
      // Add new property
      addProperty: (property) => {
        const newProperty = {
          ...property,
          id: Math.max(...get().properties.map(p => p.id), 0) + 1,
          views: 0,
          leads: 0,
          createdAt: new Date().toISOString().split('T')[0],
          status: 'active',
          featured: false,
        }
        set((state) => ({
          properties: [newProperty, ...state.properties]
        }))
        return newProperty
      },
      
      // Update property
      updateProperty: (id, updates) => {
        set((state) => ({
          properties: state.properties.map(p =>
            p.id === id ? { ...p, ...updates } : p
          )
        }))
      },
      
      // Delete property
      deleteProperty: (id) => {
        set((state) => ({
          properties: state.properties.filter(p => p.id !== id)
        }))
      },
      
      // Toggle featured
      toggleFeatured: (id) => {
        set((state) => ({
          properties: state.properties.map(p =>
            p.id === id ? { ...p, featured: !p.featured } : p
          )
        }))
      },
      
      // Update status
      updateStatus: (id, status) => {
        set((state) => ({
          properties: state.properties.map(p =>
            p.id === id ? { ...p, status } : p
          )
        }))
      },
      
      // Increment views
      incrementViews: (id) => {
        set((state) => ({
          properties: state.properties.map(p =>
            p.id === id ? { ...p, views: p.views + 1 } : p
          )
        }))
      },
      
      // Increment leads
      incrementLeads: (id) => {
        set((state) => ({
          properties: state.properties.map(p =>
            p.id === id ? { ...p, leads: p.leads + 1 } : p
          )
        }))
      },
      
      // Get property by id
      getPropertyById: (id) => {
        return get().properties.find(p => p.id === parseInt(id))
      },
      
      // Get stats
      getStats: () => {
        const properties = get().properties
        return {
          total: properties.length,
          active: properties.filter(p => p.status === 'active').length,
          pending: properties.filter(p => p.status === 'pending').length,
          sold: properties.filter(p => p.status === 'sold').length,
          totalViews: properties.reduce((sum, p) => sum + p.views, 0),
          totalLeads: properties.reduce((sum, p) => sum + p.leads, 0),
        }
      },
      
      // Clear all (for testing)
      clearAll: () => set({ properties: [] }),
      
      // Reset to initial
      resetToInitial: () => set({ properties: initialProperties }),
    }),
    {
      name: 'property-storage',
    }
  )
)

export default usePropertyStore
