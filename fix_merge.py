import re

with open("src/app/page_242.tsx", "r", encoding="utf-8") as f:
    code_242 = f.read()

with open("src/app/page_277.tsx", "r", encoding="utf-8") as f:
    code_277 = f.read()

# Helper to extract tab blocks
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
        next_idx = code.find("{/* FOOTER */}", start_idx)
    if next_idx == -1:
        next_idx = code.find("</main>", start_idx)
        
    block = code[start_idx:next_idx].strip()
    last_closing = block.rfind(')}')
    if last_closing != -1:
        block = block[:last_closing + 2]
        
    return block

# Extract the untruncated blocks
beranda_block = get_tab_block(code_277, "beranda")
program_block = get_tab_block(code_277, "program")
kemitraan_block = get_tab_block(code_242, "kemitraan")
info_lomba_block = get_tab_block(code_242, "info-lomba")
blog_block = get_tab_block(code_277, "blog")

# Redesigned Tentang Kami block from mockup
tentang_kami_block = """        {/* ==================== TAB 4: TENTANG KAMI ==================== */}
        {activeTab === "tentang-kami" && (
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
                          Memberdayakan pelajar dan mahasiswa melalui pendidikan kepenulisan ilmiah, bimbingan ahli, and komunitas inspiratif untuk menghasilkan karya ilmiah dan inovasi yang berdampak nyata.
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

# Extract header states area
main_split = "  return ("
main_idx = code_277.find(main_split)
header_states = code_277[:main_idx]

# Replace state variables
target_state_pos = header_states.find("  const [activeTestimonialPage")
new_states = """  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("kayzen_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("kayzen_user");
    setCurrentUser(null);
    setShowUserDropdown(false);
  };
"""

header_states_updated = header_states[:target_state_pos] + new_states + header_states[target_state_pos:]

# Replace react imports
header_states_updated = header_states_updated.replace(
    'import { useState } from "react";',
    'import { useState, useEffect } from "react";\nimport Link from "next/link";'
)

# Replace the Tab type definition
header_states_updated = header_states_updated.replace(
    'type Tab = "beranda" | "program" | "mentor" | "kemitraan" | "info-lomba" | "blog" | "tentang-kami";',
    'type Tab = "beranda" | "program" | "kemitraan" | "info-lomba" | "blog" | "tentang-kami";'
)

# Define merged navbar as raw string
merged_navbar = """  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDarkMode ? "bg-[#03040b] text-white" : "bg-[#FAFBFD] text-gray-800"
    } selection:bg-brand-purple selection:text-white`}>
      
      {/* HEADER / NAVBAR */}
      <header className={`sticky top-0 z-50 px-6 lg:px-16 py-4 transition-all duration-300 border-b ${
        isDarkMode 
          ? "bg-[#03040b]/95 backdrop-blur-md border-white/5 text-white" 
          : "bg-white/95 backdrop-blur-md border-black/5 text-[#0e1726]"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabChange("beranda")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <span className={`font-display font-bold text-xl tracking-wider block ${
                isDarkMode ? "text-white" : "text-[#0e1726]"
              }`}>KAYZEN</span>
              <span className="text-[10px] tracking-[0.25em] text-brand-primary font-bold block -mt-1">ACADEMIA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {[
              { id: "beranda", label: "Beranda" },
              { id: "program", label: "Program" },
              { id: "kemitraan", label: "Kemitraan" },
              { id: "info-lomba", label: "Info Lomba" },
              { id: "blog", label: "Blog" },
              { id: "tentang-kami", label: "Tentang Kami" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as Tab)}
                className={`relative py-2 text-xs lg:text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? (isDarkMode ? "text-white font-semibold" : "text-[#0e1726] font-semibold")
                    : (isDarkMode ? "text-brand-muted hover:text-white" : "text-gray-500 hover:text-gray-900")
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-brand rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Auth Action Buttons & Theme Toggle */}
          <div className="flex items-center gap-4">
            
            {/* Dark/Light Mode Theme Toggle Switcher Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isDarkMode
                  ? "bg-white/[0.03] border-white/10 text-amber-400 hover:bg-white/[0.08] hover:border-white/20"
                  : "bg-gray-100 border-gray-200 text-purple-600 hover:bg-gray-200 hover:border-gray-300"
              }`}
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464-5.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-5.05-1.243a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1zm2-7a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2.5 p-1 px-3.5 rounded-xl border border-brand-purple/20 bg-brand-purple/5 hover:bg-brand-purple/10 transition-all cursor-pointer"
                >
                  <div className="relative w-6 h-6 rounded-full overflow-hidden border border-brand-purple/35">
                    <Image src={currentUser.avatar} alt="User profile" fill className="object-cover" />
                  </div>
                  <span className={`text-xs font-semibold hidden sm:inline ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}>
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-brand-purple">▼</span>
                </button>

                {showUserDropdown && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl py-2 border transition-all duration-200 z-50 ${
                    isDarkMode
                      ? "bg-[#0c0e17] border-white/5 text-white"
                      : "bg-white border-gray-100 text-gray-800"
                  }`}>
                    <div className="px-4 py-2 border-b border-white/5 text-left">
                      <p className="text-xs font-bold truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-brand-muted truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      Keluar Sesi
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/masuk"
                  className={`px-4.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    isDarkMode
                      ? "text-white border border-white/10 hover:bg-white/5"
                      : "text-gray-700 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  Masuk
                </Link>
                <Link
                  href="/daftar"
                  className="px-4.5 py-2.5 text-xs font-bold text-white bg-gradient-brand rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-grow">
"""

# Extract footer
footer_start = code_277.find("{/* FOOTER */}")
footer_code = code_277[footer_start:]

# Replace quick links in the footer to delete mentor and bootcamp
footer_quick_links_old = """          {/* Links Cols */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Eksplorasi</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => handleTabChange("program")} className="hover:text-white transition-colors cursor-pointer text-left">Program</button></li>
              <li><button onClick={() => handleTabChange("bootcamp")} className="hover:text-white transition-colors cursor-pointer text-left">Bootcamp</button></li>
              <li><button onClick={() => handleTabChange("mentor")} className="hover:text-white transition-colors cursor-pointer text-left">Mentor</button></li>
              <li><button onClick={() => handleTabChange("kemitraan")} className="hover:text-white transition-colors cursor-pointer text-left">Kemitraan</button></li>
            </ul>
          </div>"""

footer_quick_links_new = """          {/* Links Cols */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Eksplorasi</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => handleTabChange("program")} className="hover:text-white transition-colors cursor-pointer text-left">Program</button></li>
              <li><button onClick={() => handleTabChange("kemitraan")} className="hover:text-white transition-colors cursor-pointer text-left">Kemitraan</button></li>
              <li><button onClick={() => handleTabChange("info-lomba")} className="hover:text-white transition-colors cursor-pointer text-left">Info Lomba</button></li>
              <li><button onClick={() => handleTabChange("blog")} className="hover:text-white transition-colors cursor-pointer text-left">Blog</button></li>
            </ul>
          </div>"""

footer_code = footer_code.replace(footer_quick_links_old, footer_quick_links_new)

# Prepend ONLY opening brace {" for React blocks and let trailing )} close it naturally
final_page_code = (
    header_states_updated + "\n" +
    merged_navbar + "\n" +
    "{" + beranda_block + "\n" +
    "{" + program_block + "\n" +
    "{" + kemitraan_block + "\n" +
    "{" + info_lomba_block + "\n" +
    "{" + blog_block + "\n" +
    tentang_kami_block + "\n" +
    "      </main>\n\n" +
    footer_code
)

with open("src/app/page.tsx", "w", encoding="utf-8") as out:
    out.write(final_page_code)

print("Successfully merged and generated page.tsx!")
