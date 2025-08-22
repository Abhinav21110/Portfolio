import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				electric: {
					DEFAULT: 'hsl(var(--electric))',
					glow: 'hsl(var(--electric-glow))'
				},
				purple: {
					DEFAULT: 'hsl(var(--purple))',
					glow: 'hsl(var(--purple-glow))'
				},
				orange: {
					DEFAULT: 'hsl(var(--orange))',
					glow: 'hsl(var(--orange-glow))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-electric': 'var(--gradient-electric)',
				'gradient-warm': 'var(--gradient-warm)',
				'gradient-glow': 'var(--gradient-glow)'
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'electric': 'var(--shadow-electric)',
				'purple': 'var(--shadow-purple)'
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'slide-up': 'slideUp 0.6s ease-out',
				'slide-in': 'slideIn 0.8s ease-out',
				'fade-in': 'fadeIn 0.6s ease-out',
				'bounce-in': 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'rgb-flicker-1': 'rgb-shadow-flicker-1 2s linear infinite',
        'rgb-flicker-2': 'rgb-shadow-flicker-2 3s ease-in-out infinite',
        'rgb-flicker-3': 'rgb-shadow-flicker-3 1.5s steps(1, end) infinite',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'glow': {
					'0%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.5)' },
					'100%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.8)' }
				},
				'slideUp': {
					'0%': { transform: 'translateY(30px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slideIn': {
					'0%': { transform: 'translateX(-50px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'fadeIn': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'bounceIn': {
					'0%': { transform: 'scale(0.3)', opacity: '0' },
					'50%': { transform: 'scale(1.05)' },
					'70%': { transform: 'scale(0.9)' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
        'rgb-shadow-flicker-1': {
          '0%, 100%': { boxShadow: '0 0 15px 5px rgba(255, 0, 0, 0.4)' },
          '20%': { boxShadow: '0 0 20px 7px rgba(0, 255, 0, 0.5)' },
          '40%': { boxShadow: '0 0 15px 5px rgba(0, 0, 255, 0.4)' },
          '60%': { boxShadow: '0 0 25px 8px rgba(255, 255, 0, 0.6)' },
          '80%': { boxShadow: '0 0 15px 5px rgba(0, 255, 255, 0.4)' },
        },
        'rgb-shadow-flicker-2': {
          '0%, 100%': { boxShadow: '0 0 20px 6px hsla(0, 100%, 50%, 0.5)' },
          '33%': { boxShadow: '0 0 25px 8px hsla(120, 100%, 50%, 0.6)' },
          '66%': { boxShadow: '0 0 20px 6px hsla(240, 100%, 50%, 0.5)' },
        },
        'rgb-shadow-flicker-3': {
          '0%': { boxShadow: '0 0 10px 2px #ff00ff' },
          '10%': { boxShadow: '0 0 12px 4px #00ffff' },
          '20%': { boxShadow: '0 0 10px 2px #ffff00' },
          '30%': { boxShadow: '0 0 15px 5px #ff00ff' },
          '40%': { boxShadow: '0 0 10px 2px #00ffff' },
          '50%': { boxShadow: '0 0 18px 6px #ffff00' },
          '60%': { boxShadow: '0 0 10px 2px #ff00ff' },
          '70%': { boxShadow: '0 0 20px 8px #00ffff' },
          '80%': { boxShadow: '0 0 10px 2px #ffff00' },
          '90%': { boxShadow: '0 0 22px 9px #ff00ff' },
          '100%': { boxShadow: '0 0 10px 2px #00ffff' },
        }
			}
		}
	},
	plugins: [animate],
} satisfies Config;
