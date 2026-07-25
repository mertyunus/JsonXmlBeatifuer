# ⚡ JsonXmlBeatifuer | Professional JSON & XML Studio

<div align="center">

![Next.js 15](https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=next.dot.js&logoColor=white)
![React 19](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vanilla CSS](https://img.shields.io/badge/Vanilla%20CSS-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)

**JsonXmlBeatifuer**, tek satır halinde (minified), düz metin gibi veya düzensiz girintilerle yapıştırılan **JSON** ve **XML** verilerini saniyeler içinde mükemmel bir düzene sokan, çift yönlü dönüştürme sağlayan ve interaktif ağaç görünümü (Tree View) sunan modern bir web geliştirici stüdyosudur.

[Öne Çıkan Özellikler](#-öne-çıkan-özellikler) • [Ekran Görüntüleri](#-ekran-görüntüsü--demo) • [Hızlı Kurulum](#-hızlı-kurulum) • [Teknoloji Yığıtı](#-teknoloji-yığıtı) • [Katkıda Bulunma](#-katkıda-bulunma)

</div>

---

## 🌟 Öne Çıkan Özellikler

- 🖥️ **Klasik 3-Sütunlu Studio Yerleşimi (Left - Center - Right):**
  - **Sol Panel:** Tek satır veya karmaşık haldeki veriyi yapıştırabileceğiniz satır numaralı editör.
  - **Orta Sütun:** Tüm aksiyonların tek tıkla yönetildiği kontrol paneli.
  - **Sağ Panel:** Anında biçimlendirilmiş, renklendirilmiş ve okunaklı hale gelmiş çıktı ekranı.
- ✨ **Anlık Biçimlendirme (Format / Beautify):** Seçtiğiniz boşluk kuralına (**1 Space, 2 Tab Space, 4 Tab Space**) göre veriyi otomatik girintiler ve kod bloklarına ayırır.
- 📦 **Tek Satıra Sıkıştırma (Minify / Compact):** Devasa boyutlardaki formated JSON veya XML verilerini tek satıra sıkıştırarak ağ yükünü azaltır.
- 🛡️ **Gerçek Zamanlı Doğrulama (Live Validator):** Sözdizimi (syntax) hatalarını anında tespit eder; eksik parantezler veya bozuk XML etiketlerinde hatanın sebebini bildirir.
- 🌳 **İnteraktif Ağaç Görünümü (Tree Explorer):** İç içe geçmiş karmaşık veri setlerini klasör gibi açıp kapatabileceğiniz, veri tiplerine (`String`, `Number`, `Boolean`, `Array`, `Object`) göre renk rozetleri sunan ve **arama/filtreleme** yapılabilen görsel hiyerarşi kütüphanesi.
- 🔄 **Çift Yönlü Çevirici (JSON ↔ XML Converter):** JSON verisini tek tıkla XML etiketlerine, XML etiketlerini ise anında valid JSON nesnelerine dönüştürür.
- 📂 **Dosya Yükleme & İndirme (Import / Export):** Yerel diskinizdeki `.json` ve `.xml` dosyalarını içeri aktarın veya düzenlediğiniz veriyi anında bilgisayarınıza indirin.
- 🎨 **3 Farklı Görsel Tema:** Ekran görüntüsündeki orijinal **Mint Yeşil Tema**, modern **Obsidian Dark Tema** ve aydınlık ortamlara özel **Light Tema** arasında tek tıkla geçiş yapın.
- 🎊 **Mikro-Etkileşimler (Confetti Feedback):** Kopyalama veya başarılı formatlama sonrasında motive edici konfeti animasyonları.

---

## 📸 Ekran Görüntüsü / Demo

> *3-Sütunlu çalışma alanıyla (Sol Girdi Editörü - Orta Aksiyon Paneli - Sağ Çıktı Editörü) maksimum geliştirici verimliliği ve ergonomi sağlar.*

```
+----------------------------------------------------------------------------------------------------+
|  [⚡ JsonXmlBeatifuer Studio]             [JSON Beautifier] [XML] [Converter]          [🎨 Mint]    |
+----------------------------------------------------------------------------------------------------+
|  1 | {"WorkflowUN":93,"CrmControl":... |  [ Upload Data ]  |  1 | {                              |
|  2 |                                   |  [ Validate    ]  |  2 |   "WorkflowUN": 93,            |
|  3 |                                   |  [ 2 Tab Space ]  |  3 |   "CrmControlTipsAndValues": [ |
|  4 |                                   |                   |  4 |     {                          |
|  5 |                                   | [Format/Beautify] |  5 |       "ControlTipUN": 1426,    |
|  6 |                                   | [Minify/Compact ] |  6 |       "Value": "8971"          |
|  7 |                                   | [Convert JSON  ]  |  7 |     }                          |
|  8 |                                   | [ Download    ]  |  8 |   ]                            |
|    |                                   |                   |  9 | }                              |
|    | Ln: 1  Chars: 245  Size: 0.24 KB  |  JSON Full Form   |    | Ln: 9  Chars: 312  Size: 0.31 KB |
+----------------------------------------------------------------------------------------------------+
```

---

## 🚀 Hızlı Kurulum (Quick Start)

Projeyi kendi bilgisayarınızda veya sunucunuzda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/mertyunus/JsonXmlBeatifuer.git
cd JsonXmlBeatifuer
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
# veya
pnpm install
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Tarayıcınızı açın ve `http://localhost:3000` adresine giderek stüdyoyu kullanmaya başlayın!

---

## 🐳 Docker ile Çalıştırma

Projeyi herhangi bir Node.js bağımlılığı kurmadan doğrudan **Docker** container üzerinde çalıştırmak isterseniz:

```dockerfile
# Resmî Node görüntüsünü kullan
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Docker görüntüsünü oluşturun
docker build -t json-xml-beatifuer .

# Container'ı başlatın
docker run -p 3000:3000 json-xml-beatifuer
```

---

## 🛠️ Teknoloji Yığıtı

| Teknoloji | Kullanım Amacı |
| :--- | :--- |
| **Next.js 15 (App Router)** | Modern SSR/CSR mimarisi, ultra hızlı sayfa geçişleri ve optimizasyon |
| **React 19** | Bileşen tabanlı kullanıcı arayüzü ve durum (state) yönetimi |
| **TypeScript** | Sıfır çalışma zamanı hatası ve katı tip güvenliği |
| **Vanilla CSS** | Harici CSS kütüphanesi yükü olmadan CSS Değişkenleri ile esnek Glassmorphism |
| **fast-xml-parser** | Güvenilir XML DOM ayrıştırma, formatlama ve JSON↔XML çevirimi |
| **lucide-react** | Modern, ölçeklenebilir ve hafif vektör ikonlar |
| **canvas-confetti** | Kullanıcı deneyimini zenginleştiren interaktif mikro-animasyonlar |

---

## 🤝 Katkıda Bulunma (Contributing)

Bu proje tamamen açık kaynaktır ve her türlü katkıya (yeni özellikler, tema seçenekleri, performans iyileştirmeleri veya hata düzeltmeleri) açıktır!

1. Bu depoyu forklayın (`https://github.com/mertyunus/JsonXmlBeatifuer/fork`)
2. Özellik dalınızı oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Dalınızı push edin (`git push origin feature/amazing-feature`)
5. Bir **Pull Request** açın!

---

## 📄 Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına göz atabilirsiniz.

<div align="center">
  <p><a href="https://github.com/mertyunus"><b>mertyunus</b></a> tarafından ❤️ ile geliştirildi.</p>
</div>
