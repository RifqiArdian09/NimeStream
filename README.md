# 🎌 Nimestream - Anime Streaming Platform

Nimestream adalah platform streaming anime modern yang dibangun dengan Next.js 16, menyediakan pengalaman menonton anime yang lancar dan responsif dengan fitur-fitur canggih.

## ✨ Fitur Utama

- 🎥 **Video Player Canggih** - Player dengan multiple quality options dan fullscreen support
- 🔍 **Pencarian Anime** - Cari anime favorit dengan mudah
- 📱 **Responsive Design** - Optimal di semua perangkat (mobile, tablet, desktop)
- 🔖 **Bookmark System** - Simpan episode favorit untuk ditonton nanti
- 🎭 **Genre Filtering** - Filter anime berdasarkan genre
- 📺 **Episode Tracking** - Lacak progress menonton
- 🌙 **Dark/Light Theme** - Tema yang dapat disesuaikan
- ⚡ **Fast Loading** - Optimasi performa dengan caching

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Theme**: next-themes

## 📁 Struktur Project

```
nimestream/
├── app/                    # App Router pages
│   ├── anime/[slug]/      # Detail anime
│   ├── episode/[slug]/    # Halaman episode
│   ├── search/            # Pencarian
│   ├── bookmarks/         # Bookmark
│   ├── genre/[slug]/      # Filter genre
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── AnimeCard.tsx     # Card anime
│   ├── VideoPlayer.tsx   # Video player
│   └── SearchBar.tsx     # Search component
├── lib/                  # Utilities
│   ├── api.ts           # API functions
│   ├── parser.ts        # Data parser
│   └── utils.ts         # Helper functions
└── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, atau bun

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/RifqiArdian09/NimeStream.git
   cd NimeStream
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

4. **Buka browser**
   
   Akses [http://localhost:3000](http://localhost:3000)

## 📖 Penggunaan

### Menonton Anime

1. **Browse Homepage** - Lihat anime terbaru dan populer
2. **Search** - Gunakan search bar untuk mencari anime spesifik
3. **Filter Genre** - Klik genre untuk melihat anime dalam kategori tertentu
4. **Watch Episode** - Klik episode untuk mulai menonton

### Video Player Features

- **Quality Selection** - Pilih kualitas video (Auto, HD, 720p, 1080p)
- **Fullscreen Mode** - Tekan tombol fullscreen untuk mode layar penuh
- **Bookmark Episode** - Simpan episode ke bookmark untuk akses cepat
- **Progress Tracking** - Otomatis menyimpan progress menonton

### Bookmark System

- Klik tombol bookmark pada video player
- Akses semua bookmark di halaman `/bookmarks`
- Hapus bookmark yang tidak diperlukan

## 🔧 Konfigurasi

### API Configuration

File `lib/api.ts` mengatur koneksi ke API:

```typescript
export const BASE_URL = "https://www.sankavollerei.com";
```

### Environment Variables

Buat file `.env.local` untuk konfigurasi tambahan:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_SITE_NAME=Mingane
```

## 📱 Responsive Design

- **Mobile**: Grid 2 kolom, navigasi touch-friendly
- **Tablet**: Grid 3-4 kolom, layout yang seimbang  
- **Desktop**: Grid 5-7 kolom, penggunaan ruang optimal
- **Large Screen**: Grid hingga 7 kolom untuk layar besar

## 🎨 Customization

### Tema

Project menggunakan `next-themes` untuk dark/light mode:

```typescript
// Komponen dengan theme support
import { useTheme } from 'next-themes'

const { theme, setTheme } = useTheme()
```

### Styling

TailwindCSS dengan konfigurasi custom di `tailwind.config.js`:

```javascript
// Custom colors, animations, dan utilities
module.exports = {
  // ... konfigurasi
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push ke GitHub repository
2. Connect ke Vercel
3. Deploy otomatis

### Manual Build

```bash
npm run build
npm start
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**
   - Periksa koneksi internet
   - Verifikasi BASE_URL di `lib/api.ts`

2. **Video Not Loading**
   - Coba refresh halaman
   - Periksa server video availability

3. **Build Errors**
   - Hapus `.next` folder dan `node_modules`
   - Reinstall dependencies

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Rifqi Ardian**
- GitHub: [@RifqiArdian09](https://github.com/RifqiArdian09)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [Lucide](https://lucide.dev/) - Icon library
