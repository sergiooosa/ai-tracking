// 🎨 Futuristic Color Palette & Design Tokens
export const colors = {
  // Primary Colors - Futuristic Theme
  primary: {
    blue: '#0066FF',      // Electric Blue
    purple: '#6B46C1',    // Deep Purple
    neon: '#00FF88',      // Neon Green
    dark: '#0A0A0B',      // Deep Dark Background
  },
  
  // Extended Palette
  accent: {
    cyan: '#00D9FF',
    magenta: '#FF0080',
    amber: '#FFA500',
    white: '#FFFFFF',
  },
  
  // Grays & Neutrals
  neutral: {
    900: '#0A0A0B',
    800: '#1A1A1B',
    700: '#2A2A2B',
    600: '#3A3A3B',
    500: '#6B7280',
    400: '#9CA3AF',
    300: '#D1D5DB',
    200: '#E5E7EB',
    100: '#F3F4F6',
    50: '#F9FAFB',
  },
  
  // Status Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // Gradient Definitions
  gradients: {
    primary: 'linear-gradient(135deg, #0066FF 0%, #6B46C1 100%)',
    neon: 'linear-gradient(135deg, #00FF88 0%, #00D9FF 100%)',
    dark: 'linear-gradient(135deg, #0A0A0B 0%, #1A1A1B 100%)',
    glow: 'radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 70%)',
  }
};

export const animations = {
  // Duration tokens
  duration: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.5s',
    slower: '0.8s',
  },
  
  // Easing functions
  easing: {
    easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
};

export const spacing = {
  // 8px base unit system
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '1.5rem',    // 24px
  lg: '2rem',      // 32px
  xl: '3rem',      // 48px
  '2xl': '4rem',   // 64px
  '3xl': '6rem',   // 96px
  '4xl': '8rem',   // 128px
};

export const typography = {
  fontFamily: {
    primary: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  }
}; 