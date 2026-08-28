import json

# Read the base files
with open("src/app/page_242.tsx", "r", encoding="utf-8") as f:
    code_242 = f.read()

with open("src/app/page_277.tsx", "r", encoding="utf-8") as f:
    code_277 = f.read()

# Helper to extract the tab block code
def get_tab_block(code, tab_name):
    start_pattern = f'activeTab === "{tab_name}" && ('
    start_idx = code.find(start_pattern)
    if start_idx == -1:
        start_pattern = f"activeTab === '{tab_name}' && ("
        start_idx = code.find(start_pattern)
    
    if start_idx == -1:
        return None
    
    next_idx = code.find("activeTab ===", start_idx + 20)
    if next_idx == -1:
        next_idx = code.find("{/* ==================== FOOTER ==================== */}", start_idx)
    if next_idx == -1:
        next_idx = code.find("</main>", start_idx)
        
    block = code[start_idx:next_idx].strip()
    last_closing = block.rfind(')}')
    if last_closing != -1:
        block = block[:last_closing + 2]
        
    return block

# Extract the full tabs from the correct versions
beranda_block = get_tab_block(code_277, "beranda")
program_block = get_tab_block(code_277, "program")
kemitraan_block = get_tab_block(code_242, "kemitraan")
info_lomba_block = get_tab_block(code_242, "info-lomba")
blog_block = get_tab_block(code_277, "blog")

# Redesigned Tentang Kami tab block matching the mockup perfectly
tentang_kami_block = """{activeTab === "tentang-kami" && (
          <div className="space-y-0">
            
            {/* HERO SECTION (DARK BLUE/BLACK BG AS PER MOCKUP) */}
            <section className="relative pt-12 pb-16 px-6 lg:px-16 bg-[#080b16] text-white overflow-hidden border-b border-white/5">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-muted uppercase tracking-wider text-left">
                  <span className="cursor-pointer hover:text-white transition-colors" onClick={() => handleTabChange("beranda")}>Beranda</span>
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-white">Tentang Kami</span>
                </div>

                {/* Hero Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Left Column: Title & Text */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight text-white">
                      Tentang <br />
                      <span className="text-gradient">Kayzen Academia</span>
                    </h1>

                    <p className="text-brand-primary font-bold text-sm sm:text-base leading-relaxed">
                      Mendorong ide, menulis ilmiah, dan menciptakan inovasi untuk perubahan nyata.
                    </p>

                    <p className="text-xs sm:text-sm leading-relaxed text-brand-muted max-w-xl">
                      Kayzen Academia adalah platform pembelajaran yang berfokus pada pengembangan keterampilan kepenulisan ilmiah, riset, dan inovasi bagi pelajar dan mahasiswa di seluruh Indonesia. Kami percaya, setiap ide yang ditulis dengan baik dapat menjadi awal dari solusi untuk tantangan dunia nyata.
                    </p>
                  </div>

                  {/* Right Column: Visual Image */}
                  <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:max-w-md lg:max-w-none mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-purple/20 rounded-3xl blur-2xl opacity-50 pointer-events-none" />
                    <div className="relative w-full h-full border border-white/10 rounded-3xl overflow-hidden shadow-2xl bg-brand-card">
                      <Image
                        src="/hero_students.png"
                        alt="Kayzen Academia Students holding trophy"
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Stats Row inside Hero */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl border border-white/5 bg-[#0e1224]/50 backdrop-blur-md">
                  {[
                    {
                      num: "2K+",
                      title: "Pelajar Aktif",
                      desc: "Bergabung dan terus bertumbuh bersama kami.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 025.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )
                    },
                    {
                      num: "50+",
                      title: "Mentor Ahli",
                      desc: "Dosen, peneliti, dan praktisi berpengalaman di bidangnya.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-4-9 4 9 5zm0 0l-9-4.243V17a4 4 0 004 4h10a4 4 0 004-4v-6.243L12 14z" />
                        </svg>
                      )
                    },
                    {
                      num: "30+",
                      title: "Program",
                      desc: "Kelas dan bootcamp berkualitas untuk berbagai kebutuhan.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                        </svg>
                      )
                    },
                    {
                      num: "95%",
                      title: "Tingkat Kepuasan",
                      desc: "Dari ribuan peserta yang telah belajar bersama kami.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )
                    }
                  ].map((hl, i) => (
                    <div key={i} className="flex gap-4 p-3 text-left">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center">
                        {hl.icon}
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-display font-extrabold text-lg text-white">{hl.num}</div>
                        <h4 className="font-bold text-xs text-white">{hl.title}</h4>
                        <p className="text-[10px] leading-relaxed text-brand-muted">{hl.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CONTENT BG WRAPPER (LIGHT GREY BACKGROUND EXACTLY AS MOCKUP) */}
            <div className={`py-20 space-y-24 transition-colors duration-300 ${
              isDarkMode ? "bg-brand-dark text-white" : "bg-[#FAFBFD] text-gray-800"
            }`}>
              
              {/* MISI & VISI KAMI */}
              <section className="px-6 lg:px-16">
                <div className="max-w-7xl mx-auto space-y-12">
                  <div className="text-center space-y-3">
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold">Misi & Visi Kami</h2>
                    <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Misi Card */}
                    <div className={`p-8 rounded-3xl border flex gap-6 text-left items-start ${
                      isDarkMode ? "bg-brand-card/30 border-white/5 text-white" : "bg-white border-gray-100 shadow-sm shadow-gray-100"
                    }`}>
                      <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary flex-shrink-0">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display font-extrabold text-lg">Misi</h3>
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Memberdayakan pelajar dan mahasiswa melalui pendidikan kepenulisan ilmiah, bimbingan ahli, dan komunitas inspiratif untuk menghasilkan karya ilmiah dan inovasi yang berdampak nyata.
                        </p>
                      </div>
                    </div>

                    {/* Visi Card */}
                    <div className={`p-8 rounded-3xl border flex gap-6 text-left items-start ${
                      isDarkMode ? "bg-brand-card/30 border-white/5 text-white" : "bg-white border-gray-100 shadow-sm shadow-gray-100"
                    }`}>
                      <div className="w-14 h-14 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple flex-shrink-0">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display font-extrabold text-lg">Visi</h3>
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Menjadi ekosistem pembelajaran kepenulisan ilmiah dan inovasi terdepan di Indonesia yang melahirkan generasi penulis dan inovator masa depan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* APA YANG KAMI LAKUKAN */}
              <section className="px-6 lg:px-16">
                <div className="max-w-7xl mx-auto space-y-12">
                  <div className="text-center space-y-3">
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold">Apa yang Kami Lakukan</h2>
                    <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        title: "Pendidikan Ilmiah",
                        desc: "Program terstruktur dan materi komprehensif untuk menguasai kepenulisan ilmiah, riset, dan inovasi.",
                        icon: (
                          <svg className="w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                          </svg>
                        )
                      },
                      {
                        title: "Bimbingan Ahli",
                        desc: "Belajar langsung dari mentor berpengalaman yang siap membimbing setiap langkah perjalananmu.",
                        icon: (
                          <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 025.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )
                      },
                      {
                        title: "Komunitas Inspiratif",
                        desc: "Bergabung dengan ribuan pelajar dan mahasiswa untuk saling bertukar ide dan bertumbuh bersama.",
                        icon: (
                          <svg className="w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0zm7-2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )
                      },
                      {
                        title: "Dampak Nyata",
                        desc: "Mendorong lahirnya karya ilmiah dan inovasi yang memberikan solusi untuk tantangan di dunia nyata.",
                        icon: (
                          <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )
                      }
                    ].map((act, i) => (
                      <div key={i} className={`p-6 rounded-2xl border flex flex-col justify-start text-left space-y-4 ${
                        isDarkMode ? "bg-brand-card/30 border-white/5" : "bg-white border-gray-100 shadow-sm shadow-gray-100"
                      }`}>
                        <div className="w-12 h-12 rounded-xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center flex-shrink-0">
                          {act.icon}
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-display font-extrabold text-sm sm:text-base">{act.title}</h3>
                          <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>{act.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* NILAI-NILAI KAMI */}
              <section className="px-6 lg:px-16">
                <div className="max-w-7xl mx-auto space-y-12">
                  <div className="text-center space-y-3">
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold">Nilai-Nilai Kami</h2>
                    <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {[
                      {
                        title: "Inovatif",
                        desc: "Selalu mencari cara baru untuk menciptakan solusi dan peluang.",
                        icon: (
                          <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        )
                      },
                      {
                        title: "Ilmiah",
                        desc: "Mengutamakan pendekatan ilmiah dalam setiap program, materi, dan pendampingan.",
                        icon: (
                          <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        )
                      },
                      {
                        title: "Kolaboratif",
                        desc: "Bersinergi dan saling mendukung untuk mencapai tujuan bersama.",
                        icon: (
                          <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0zm7-2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )
                      },
                      {
                        title: "Integritas",
                        desc: "Menjunjung tinggi kejujuran, etika, dan tanggung jawab dalam setiap langkah.",
                        icon: (
                          <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                          </svg>
                        )
                      },
                      {
                        title: "Berdampak",
                        desc: "Berkomitmen menghasilkan karya dan inovasi yang bermanfaat luas.",
                        icon: (
                          <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )
                      }
                    ].map((val, i) => (
                      <div key={i} className={`p-6 rounded-2xl border text-center space-y-4 hover:border-brand-primary/20 transition-all flex flex-col items-center justify-start ${
                        isDarkMode ? "bg-brand-card/30 border-white/5 text-white" : "bg-white border-gray-100 text-gray-800 shadow-sm shadow-gray-100"
                      }`}>
                        <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center flex-shrink-0 text-brand-primary">
                          {val.icon}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs sm:text-sm">{val.title}</h4>
                          <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>{val.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* TIM DI BALIK KAYZEN ACADEMIA */}
              <section className="px-6 lg:px-16">
                <div className="max-w-7xl mx-auto space-y-12">
                  <div className="text-center space-y-3">
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold">Tim di Balik Kayzen Academia</h2>
                    <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {teamMembers.slice(0, 6).map((member, i) => (
                      <div key={i} className={`rounded-2xl p-5 text-center flex flex-col justify-between items-center space-y-4 border hover:border-brand-primary/20 ${
                        isDarkMode ? "bg-brand-card/30 border-white/5 text-white" : "bg-white border-gray-100 text-gray-800 shadow-sm shadow-gray-100"
                      }`}>
                        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                          <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-bold text-xs sm:text-sm leading-tight min-h-[32px] flex items-center justify-center">
                            {member.name}
                          </h4>
                          <span className={`text-[10px] font-bold block ${member.roleColor}`}>
                            {member.role}
                          </span>
                        </div>

                        {/* LinkedIn and Mail Icons */}
                        <div className="flex items-center gap-3 pt-2 text-gray-400">
                          <a href="#" className="hover:text-brand-primary transition-colors">
                            <span className="font-bold text-xs">in</span>
                          </a>
                          <a href="#" className="hover:text-brand-purple transition-colors">
                            <span>✉️</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA BANNER */}
              <section className="px-6 lg:px-16">
                <div className="max-w-5xl mx-auto rounded-3xl bg-[#080b16] p-8 sm:p-12 border border-white/5 relative overflow-hidden shadow-2xl text-white">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-left">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0 text-brand-primary">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-4-9 4 9 5zm0 0l-9-4.243V17a4 4 0 004 4h10a4 4 0 004-4v-6.243L12 14z" />
                        </svg>
                      </div>
                      <div className="space-y-2">
                        <h2 className="font-display text-lg sm:text-xl font-extrabold tracking-tight">
                          Bergabung dan Jadi Bagian dari Perubahan!
                        </h2>
                        <p className="text-brand-muted text-xs leading-relaxed max-w-xl">
                          Bersama Kayzen Academia, wujudkan ide-idemu menjadi karya ilmiah dan inovasi yang berdampak bagi masa depan.
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <button className="px-6 py-3.5 bg-gradient-brand text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2 group cursor-pointer">
                        Mulai Belajar Gratis
                        <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        )}"""

# Generate full pages file content using components and navbar configurations
# We'll construct the page.tsx text using python string formatting
final_code = f"""\"use client\";

import {{ useState, useEffect }} from \"react\";
import Image from \"next/image\";
import Link from \"next/link\";

type Tab = \"beranda\" | \"program\" | \"kemitraan\" | \"info-lomba\" | \"blog\" | \"tentang-kami\";

export default function Home() {{
  const [activeTab, setActiveTab] = useState<Tab>(\"blog\");
  const [activeTestimonialPage, setActiveTestimonialPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState(\"\");
  const [activeCategory, setActiveCategory] = useState(\"Semua\");
  const [activeBlogCategory, setActiveBlogCategory] = useState(\"Semua\");
  const [filterTingkat, setFilterTingkat] = useState(\"Semua\");
  const [filterStatus, setFilterStatus] = useState(\"Semua\");
  const [filterBatas, setFilterBatas] = useState(\"Semua\");
  const [filterPeserta, setFilterPeserta] = useState(\"Semua\");
  const [sortOrder, setSortOrder] = useState(\"Terbaru\");

  // THEME SWITCHER & USER SESSIONS
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Load user session on mount
  useEffect(() => {{
    const savedUser = localStorage.getItem(\"kayzen_user\");
    if (savedUser) {{
      setCurrentUser(JSON.parse(savedUser));
    }}
  }}, []);

  // Navigation handlers
  const handleTabChange = (tab: Tab) => {{
    setActiveTab(tab);
    window.scrollTo({{ top: 0, behavior: \"smooth\" }});
  }};

  const handleLogout = () => {{
    localStorage.removeItem(\"kayzen_user\");
    setCurrentUser(null);
    setShowUserDropdown(false);
  }};

  const testimonials = [
    [
      {{
        quote: `\"Essay Bootcamp membantu saya lolos beasiswa impian! Materinya praktis dan mentornya sangat suportif.\"`,
        author: \"Nabila A.\",
        title: \"Awardee LPDP 2024\",
        avatar: \"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80\"
      }},
      {{
        quote: `\"KTI Bootcamp memberikan saya fondasi kuat untuk penelitian saya. Highly recommended!\"`,
        author: \"Raihan P.\",
        title: \"Mahasiswa S2\",
        avatar: \"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80\"
      }},
      {{
        quote: `\"Bisnis Plan Bootcamp membuka cara pandang baru dalam menyusun rencana bisnis yang solid.\"`,
        author: \"Dinda S.\",
        title: \"Founder, Startup Edu\",
        avatar: \"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80\"
      }}
    ],
    [
      {{
        quote: `\"Materi yang diajarkan sangat sistematis. Saya berhasil menjuarai LKTI Nasional berkat bimbingan di sini.\"`,
        author: \"Arif M.\",
        title: \"Juara 1 LKTI Nasional\",
        avatar: \"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80\"
      }},
      {{
        quote: `\"Sangat membantu dalam menstrukturkan ide bisnis saya. Penyampaian mentor sangat detail dan aplikatif.\"`,
        author: \"Sarah W.\",
        title: \"Juara Business Plan UI\",
        avatar: \"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80\"
      }},
      {{
        quote: `\"Komunitasnya sangat aktif. Saya mendapat banyak rekan kolaborasi riset yang satu frekuensi.\"`,
        author: \"Kevin L.\",
        title: \"Riset Partner\",
        avatar: \"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80\"
      }}
    ]
  ];

  const categories = [
    {{ name: \"Semua\", icon: (
      <svg className=\"w-5 h-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" strokeWidth={{2}}>
        <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z\" />
      </svg>
    )}}.name,
    {{ name: \"Karya Tulis Ilmiah\", icon: (
      <svg className=\"w-5 h-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" strokeWidth={{2}}>
        <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253\" />
      </svg>
    )}}.name,
    {{ name: \"Esai\", icon: (
      <svg className=\"w-5 h-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" strokeWidth={{2}}>
        <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\" />
      </svg>
    )}}.name,
    {{ name: \"Inovasi & Teknologi\", icon: (
      <svg className=\"w-5 h-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" strokeWidth={{2}}>
        <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z\" />
      </svg>
    )}}.name,
    {{ name: \"Bisnis & Kewirausahaan\", icon: (
      <svg className=\"w-5 h-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" strokeWidth={{2}}>
        <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4.67 12.89a4 4 0 11-5.34 0M18 16a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 012-2h12z\" />
      </svg>
    )}}.name,
    {{ name: \"Desain & Media\", icon: (
      <svg className=\"w-5 h-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" strokeWidth={{2}}>
        <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z\" />
      </svg>
    )}}.name,
    {{ name: \"Lingkungan & Sosial\", icon: (
      <svg className=\"w-5 h-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" strokeWidth={{2}}>
        <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V8.145m-1.5 10.3A12.042 12.042 0 1112 21c-4.756 0-8.879-2.738-10.945-6.755\" />
      </svg>
    )}}.name,
    {{ name: \"Lainnya\", icon: (
      <svg className=\"w-5 h-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" strokeWidth={{2}}>
        <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z\" />
      </svg>
    )}}.name
  ];

  const contests = [
    {{
      title: \"National Essay Competition 2024\",
      category: \"Esai\",
      status: \"Pendaftaran Dibuka\",
      statusColor: \"bg-emerald-500/10 text-emerald-400 border border-emerald-500/20\",
      image: \"/lomba_essay.png\",
      level: \"Tingkat Nasional\",
      description: \"Kompetisi esai nasional untuk pelajar dan mahasiswa dengan tema keberlanjutan dan masa depan Indonesia.\",
      deadline: \"30 Juni 2024\",
      target: \"Pelajar SMA, Mahasiswa\",
      prize: \"Rp 25.000.000\",
      tags: [\"Esai\", \"Nasional\"]
    }},
    {{
      title: \"Indonesia Student Innovation Award 2024\",
      category: \"Inovasi & Teknologi\",
      status: \"Pendaftaran Dibuka\",
      statusColor: \"bg-blue-500/10 text-blue-400 border border-blue-500/20\",
      image: \"/lomba_inovasi.png\",
      level: \"Tingkat Nasional\",
      description: \"Ajang inovasi dan teknologi bagi mahasiswa untuk menciptakan solusi nyata bagi masyarakat.\",
      deadline: \"15 Juli 2024\",
      target: \"Mahasiswa (D3, S1)\",
      prize: \"Rp 50.000.000\",
      tags: [\"Inovasi\", \"Teknologi\"]
    }},
    {{
      title: \"Business Plan Competition 2024\",
      category: \"Bisnis & Kewirausahaan\",
      status: \"Segera Ditutup\",
      statusColor: \"bg-amber-500/10 text-amber-400 border border-amber-500/20\",
      image: \"/lomba_bisnis.png\",
      level: \"Tingkat Nasional\",
      description: \"Kompetisi rencana bisnis untuk pelajar dan mahasiswa yang memiliki ide bisnis kreatif dan berdampak.\",
      deadline: \"25 Mei 2024\",
      target: \"Pelajar SMA, Mahasiswa\",
      prize: \"Rp 30.000.000\",
      tags: [\"Bisnis\", \"Kewirausahaan\"]
    }},
    {{
      title: \"National Design Challenge 2024\",
      category: \"Desain & Media\",
      status: \"Pendaftaran Dibuka\",
      statusColor: \"bg-purple-500/10 text-purple-400 border border-purple-500/20\",
      image: \"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80\",
      level: \"Tingkat Nasional\",
      description: \"Tantangan desain grafis dan multimedia untuk pelajar dan mahasiswa berbakat dari seluruh Indonesia.\",
      deadline: \"10 Juli 2024\",
      target: \"Pelajar SMA, Mahasiswa\",
      prize: \"Rp 20.000.000\",
      tags: [\"Desain\", \"Media\"]
    }}
  ];

  const teamMembers = [
    {{
      name: \"Ghifari Haidar\",
      role: \"Founder & CEO\",
      roleColor: \"text-brand-primary\",
      desc: \"Peneliti dan educator dengan fokus pada inovasi pendidikan dan pengembangan talenta.\",
      avatar: \"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80\"
    }},
    {{
      name: \"Nabilah Azzahra\",
      role: \"Head of Program\",
      roleColor: \"text-brand-purple\",
      desc: \"Mengembangkan kurikulum berbasis riset dan kebutuhan industri masa depan.\",
      avatar: \"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80\"
    }},
    {{
      name: \"Raihan Putra\",
      role: \"Head of Mentorship\",
      roleColor: \"text-brand-primary\",
      desc: \"Memimpin program mentorship dan pengembangan mentor di Kayzen Academia.\",
      avatar: \"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80\"
    }},
    {{
      name: \"Aulia Rahma\",
      role: \"Head of Community\",
      roleColor: \"text-brand-purple\",
      desc: \"Membangun komunitas belajar yang suportif dan berdaya bagi seluruh anggota.\",
      avatar: \"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80\"
    }},
    {{
      name: \"Fadly Akbar\",
      role: \"Head of Partnership\",
      roleColor: \"text-brand-primary\",
      desc: \"Menjalin kemitraan strategis dengan institusi pendidikan dan industri.\",
      avatar: \"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80\"
    }},
    {{
      name: \"Dinda Safitri\",
      role: \"Head of Marketing\",
      roleColor: \"text-brand-purple\",
      desc: \"Merancang strategi komunikasi dan pertumbuhan Kayzen Academia.\",
      avatar: \"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80\"
    }},
    {{
      name: \"M. Farrel A.\",
      role: \"Program Specialist\",
      roleColor: \"text-brand-primary\",
      desc: \"Merancang dan memastikan program pembelajaran berjalan optimal.\",
      avatar: \"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80\"
    }},
    {{
      name: \"Salma Nur F.\",
      role: \"Content & Research\",
      roleColor: \"text-brand-purple\",
      desc: \"Mengembangkan konten edukatif berbasis riset terpercaya.\",
      avatar: \"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80\"
    }},
    {{
      name: \"Alif D. Saputra\",
      role: \"Tech & Product\",
      roleColor: \"text-brand-primary\",
      desc: \"Mengembangkan platform dan teknologi untuk pengalaman belajar terbaik.\",
      avatar: \"https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=150&q=80\"
    }},
    {{
      name: \"Rizky Aulia\",
      role: \"Community Manager\",
      roleColor: \"text-brand-purple\",
      desc: \"Mengelola komunitas dan membangun engagement yang bermakna.\",
      avatar: \"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80\"
    }},
    {{
      name: \"Hasan Basri\",
      role: \"Design Lead\",
      roleColor: \"text-brand-primary\",
      desc: \"Merancang identitas visual dan pengalaman belajar yang inspiratif.\",
      avatar: \"https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80\"
    }},
    {{
      name: \"Nadya Putri\",
      role: \"Operations Manager\",
      roleColor: \"text-brand-purple\",
      desc: \"Memastikan operasional internal berjalan efisien dan terstruktur.\",
      avatar: \"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=150&q=80\"
    }}
  ];

  // Dynamic filtering of contests
  const filteredContests = contests.filter((c) => {{
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === \"Semua\" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  }});

  return (
    <div className={{`min-h-screen flex flex-col font-sans transition-colors duration-300 ${{
      isDarkMode ? \"bg-[#03040b] text-white\" : \"bg-[#FAFBFD] text-gray-800\"
    }} selection:bg-brand-purple selection:text-white`}}>
      
      {{/* HEADER / NAVBAR */}}
      <header className={{`sticky top-0 z-50 px-6 lg:px-16 py-4 transition-all duration-300 border-b ${{
        isDarkMode 
          ? \"bg-[#03040b]/95 backdrop-blur-md border-white/5 text-white\" 
          : \"bg-white/95 backdrop-blur-md border-black/5 text-[#0e1726]\"
      }}`}}>
        <div className=\"max-w-7xl mx-auto flex items-center justify-between\">
          {{/* Logo */}}
          <div className=\"flex items-center gap-3 cursor-pointer\" onClick={() => handleTabChange(\"beranda\")}>
            <div className=\"w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-brand-primary/20\">
              <svg className=\"w-6 h-6 text-white\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" strokeWidth={{2}}>
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253\" />
              </svg>
            </div>
            <div>
              <span className={{`font-display font-bold text-xl tracking-wider block ${{
                isDarkMode ? \"text-white\" : \"text-[#0e1726]\"
              }}`}}>KAYZEN</span>
              <span className=\"text-[10px] tracking-[0.25em] text-brand-primary font-bold block -mt-1\">ACADEMIA</span>
            </div>
          </div>

          {{/* Navigation Links */}}
          <nav className=\"hidden md:flex items-center gap-7 lg:gap-8\">
            {[
              {{ id: \"beranda\", label: \"Beranda\" }},
              {{ id: \"program\", label: \"Program\" }},
              {{ id: \"kemitraan\", label: \"Kemitraan\" }},
              {{ id: \"info-lomba\", label: \"Info Lomba\" }},
              {{ id: \"blog\", label: \"Blog\" }},
              {{ id: \"tentang-kami\", label: \"Tentang Kami\" }}
            ].map((tab) => (
              <button
                key={{tab.id}}
                onClick={() => handleTabChange(tab.id as Tab)}
                className={{`relative py-2 text-xs lg:text-sm font-medium transition-colors cursor-pointer ${{
                  activeTab === tab.id
                    ? (isDarkMode ? \"text-white font-semibold\" : \"text-[#0e1726] font-semibold\")
                    : (isDarkMode ? \"text-brand-muted hover:text-white\" : \"text-gray-500 hover:text-gray-900\")
                }}`}}
              >
                {{tab.label}}
                {{activeTab === tab.id && (
                  <span className=\"absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-brand rounded-full\" />
                )}}
              </button>
            ))}
          </nav>

          {{/* Auth Action Buttons & Theme Toggle */}}
          <div className=\"flex items-center gap-4\">
            
            {{/* Dark/Light Mode Theme Toggle Switcher Button */}}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={{`p-2.5 rounded-xl border transition-all cursor-pointer ${{
                isDarkMode
                  ? \"bg-white/[0.03] border-white/10 text-amber-400 hover:bg-white/[0.08] hover:border-white/20\"
                  : \"bg-gray-100 border-gray-200 text-purple-600 hover:bg-gray-200 hover:border-gray-300\"
              }}`}}
              title=\"Toggle Theme\"
            >
              {{isDarkMode ? (
                <svg className=\"w-4 h-4 sm:w-5 sm:h-5\" fill=\"currentColor\" viewBox=\"0 0 20 20\">
                  <path fillRule=\"evenodd\" d=\"M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464-5.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-5.05-1.243a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1zm2-7a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707z\" clipRule=\"evenodd\" />
                </svg>
              ) : (
                <svg className=\"w-4 h-4 sm:w-5 sm:h-5\" fill=\"currentColor\" viewBox=\"0 0 20 20\">
                  <path d=\"M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z\" />
                </svg>
              )}}
            </button>

            {{currentUser ? (
              <div className=\"relative\">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className=\"flex items-center gap-2.5 p-1 px-3.5 rounded-xl border border-brand-purple/20 bg-brand-purple/5 hover:bg-brand-purple/10 transition-all cursor-pointer\"
                >
                  <div className=\"relative w-6 h-6 rounded-full overflow-hidden border border-brand-purple/35\">
                    <Image src={{currentUser.avatar}} alt=\"User profile\" fill className=\"object-cover\" />
                  </div>
                  <span className={{`text-xs font-semibold hidden sm:inline ${{
                    isDarkMode ? \"text-white\" : \"text-gray-800\"
                  }}`}}>
                    {{currentUser.name}}
                  </span>
                  <span className=\"text-[10px] text-brand-purple\">▼</span>
                </button>

                {{showUserDropdown && (
                  <div className={{`absolute right-0 mt-2 w-48 rounded-xl shadow-xl py-2 border transition-all duration-200 z-50 ${{
                    isDarkMode
                      ? \"bg-[#0c0e17] border-white/5 text-white\"
                      : \"bg-white border-gray-100 text-gray-800\"
                  }}`}}>
                    <div className=\"px-4 py-2 border-b border-white/5 text-left\">
                      <p className=\"text-xs font-bold truncate\">{{currentUser.name}}</p>
                      <p className=\"text-[10px] text-brand-muted truncate\">{{currentUser.email}}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className=\"w-full text-left px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer\"
                    >
                      Keluar Sesi
                    </button>
                  </div>
                )}}
              </div>
            ) : (
              <div className=\"flex items-center gap-3\">
                <Link
                  href=\"/masuk\"
                  className={{`px-4.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${{
                    isDarkMode
                      ? \"text-white border border-white/10 hover:bg-white/5\"
                      : \"text-gray-700 border border-gray-200 hover:bg-gray-100\"
                  }}`}}
                >
                  Masuk
                </Link>
                <Link
                  href=\"/daftar\"
                  className=\"px-4.5 py-2.5 text-xs font-bold text-white bg-gradient-brand rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer\"
                >
                  Daftar
                </Link>
              </div>
            )}}
          </div>
        </div>
      </header>

      {{/* MAIN CONTENT WRAPPER */}}
      <main className=\"flex-grow\">
        {beranda_block}
        {program_block}
        {kemitraan_block}
        {info_lomba_block}
        {blog_block}
        {tentang_kami_block}
      </main>

      {{/* ==================== FOOTER ==================== */}}
      <footer className=\"bg-[#04060f] border-t border-white/5 text-white py-16 px-6 lg:px-16\">
        <div className=\"max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-left\">
          
          {{/* Logo & Brand Info */}}
          <div className=\"md:col-span-5 space-y-6\">
            <div className=\"flex items-center gap-3\">
              <div className=\"w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg\">
                <svg className=\"w-6 h-6 text-white\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" strokeWidth={{2}}>
                  <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253\" />
                </svg>
              </div>
              <div>
                <span className=\"font-display font-bold text-xl tracking-wider text-white block\">KAYZEN</span>
                <span className=\"text-[10px] tracking-[0.25em] text-brand-primary font-bold block -mt-1\">ACADEMIA</span>
              </div>
            </div>

            <p className=\"text-brand-muted text-xs leading-relaxed max-w-sm\">
              Kayzen Academia adalah ekosistem pembelajaran menulis ilmiah dan inovasi terdepan di Indonesia. Kami siap mendampingimu menghasilkan karya berkualitas tinggi untuk kemajuan diri dan bangsa.
            </p>

            {{/* Social Medias */}}
            <div className=\"flex items-center gap-4\">
              {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map((sm) => (
                <a
                  key={{sm}}
                  href=\"#\"
                  className=\"w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-brand-primary/10 hover:border-brand-primary/20 text-brand-muted hover:text-white transition-all\"
                >
                  <span className=\"text-xs font-bold uppercase\">{{sm[:2]}}</span>
                </a>
              ))}
            </div>
          </div>

          {{/* Quick Navigation Links */}}
          <div className=\"md:col-span-3 space-y-4\">
            <h4 className=\"font-display font-bold text-sm tracking-wider uppercase text-white\">Navigasi</h4>
            <ul className=\"space-y-3.5 text-xs\">
              {[
                {{ id: 'beranda', label: 'Beranda' }},
                {{ id: 'program', label: 'Program' }},
                {{ id: 'kemitraan', label: 'Kemitraan' }},
                {{ id: 'info-lomba', label: 'Info Lomba' }},
                {{ id: 'blog', label: 'Blog' }},
                {{ id: 'tentang-kami', label: 'Tentang Kami' }}
              ].map((link) => (
                <li key={{link.id}}>
                  <button
                    onClick={() => handleTabChange(link.id as Tab)}
                    className=\"text-brand-muted hover:text-white font-medium transition-colors text-left cursor-pointer\"
                  >
                    {{link.label}}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {{/* Help & Contact Support */}}
          <div className=\"md:col-span-4 space-y-6\">
            <h4 className=\"font-display font-bold text-sm tracking-wider uppercase text-white\">Kontak & Bantuan</h4>
            <div className=\"space-y-3 text-xs text-brand-muted\">
              <div className=\"flex items-center gap-3\">
                <span>📍</span>
                <p>Gedung Kayzen, Kuningan, Jakarta Selatan, Indonesia</p>
              </div>
              <div className=\"flex items-center gap-3\">
                <span>📧</span>
                <p>support@kayzenacademia.id</p>
              </div>
              <div className=\"flex items-center gap-3\">
                <span>📞</span>
                <p>+62 821-2345-6789</p>
              </div>
            </div>
          </div>

        </div>

        {{/* Divider & Copyright Bar */}}
        <div className=\"max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted\">
          <p>&copy; 2026 Kayzen Academia. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className=\"flex items-center gap-6\">
            <a href=\"#\" className=\"hover:text-white transition-colors\">Syarat & Ketentuan</a>
            <a href=\"#\" className=\"hover:text-white transition-colors\">Kebijakan Privasi</a>
          </div>
        </div>
      </footer>

    </div>
  );
}}
\"\"\"

with open("src/app/page.tsx", "w", encoding="utf-8") as out:
    out.write(final_code)

print("Merged page.tsx successfully!")
