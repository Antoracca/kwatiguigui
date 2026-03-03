const fs = require('fs');
const content = fs.readFileSync('src/components/dashboard/student/StudentSectionCard.tsx', 'utf8');

const newRender = `  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="group relative flex flex-col lg:flex-row overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none">
      
      {/* ── LEFT PANEL (HERO / STATUS) ── */}
      <div
        className={[
          "relative flex w-full flex-col items-center justify-center p-8 text-center transition-colors duration-500 lg:w-[45%] lg:min-h-[600px] lg:items-start lg:justify-between lg:p-12 lg:text-left overflow-hidden",
          isStudent 
            ? "bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-900 text-white" 
            : "bg-neutral-50 dark:bg-neutral-950",
        ].join(" ")}
      >
        {isStudent && (
          <>
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-400/30 blur-3xl relative z-0" />
          </>
        )}

        {/* Top Content */}
        <div className="relative z-10 flex w-full flex-col items-center lg:items-start">
          <div className="mb-8 flex h-48 w-48 items-center justify-center drop-shadow-2xl lg:h-64 lg:w-64 transition-transform hover:scale-105 duration-500">
            <DotLottieReact src="/images/studing.lottie" loop autoplay className="h-full w-full object-contain" />
          </div>

          <h2 className={[
            "mb-3 text-3xl font-black tracking-tight drop-shadow-sm", 
            isStudent ? "text-white" : "text-neutral-900 dark:text-neutral-100"
          ].join(" ")}>
            Étudiant & Talent
          </h2>
          <p className={[
            "mb-8 max-w-sm text-sm font-medium leading-relaxed", 
            isStudent ? "text-purple-100" : "text-neutral-500 dark:text-neutral-400"
          ].join(" ")}>
            {isStudent 
              ? "🚀 Votre profil est propulsé en tête de liste pour les recruteurs locaux et internationaux recherchant la perle rare."
              : "Activez le mode étudiant pour débloquer des offres de stages et d'alternance invisibles au grand public."}
          </p>
        </div>

        {/* Bottom Master Toggle */}
        <div className="relative z-10 w-full mt-auto">
          <div className={[
            "flex w-full items-center justify-between rounded-2xl p-5 backdrop-blur-md transition-all duration-300 hover:shadow-lg", 
            isStudent 
              ? "bg-white/10 border border-white/20 shadow-xl" 
              : "bg-white border border-neutral-200 shadow-sm dark:bg-neutral-900/50 dark:border-neutral-800"
          ].join(" ")}>
            <div className="flex flex-col text-left">
              <span className={[
                "text-xs font-black uppercase tracking-widest", 
                isStudent ? "text-white" : "text-neutral-900 dark:text-neutral-100"
              ].join(" ")}>
                Visibilité
              </span>
              <span className={[
                "text-xs font-bold mt-0.5 flex items-center gap-1.5", 
                isStudent ? "text-green-300" : "text-neutral-500"
              ].join(" ")}>
                {isStudent && <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />}
                {isStudent ? "Profil Actif" : "Désactivé"}
              </span>
            </div>
            
            <button
              type="button"
              role="switch"
              aria-checked={isStudent}
              disabled={toggling}
              onClick={() => handleToggleStudent(!isStudent)}
              className={[
                "relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
                "disabled:cursor-wait disabled:opacity-60",
                isStudent ? "bg-green-400" : "bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600",
              ].join(" ")}
            >
              <span
                className={[
                  "pointer-events-none inline-block h-7 w-7 transform rounded-full shadow-lg ring-0 transition-transform duration-300",
                  isStudent ? "translate-x-6 bg-white" : "translate-x-0 bg-white dark:bg-neutral-400",
                ].join(" ")}
              />
            </button>
          </div>
          {error && !isStudent && <p className="mt-3 text-xs font-medium text-error-500 text-center">{error}</p>}
        </div>
      </div>

      {/* ── RIGHT PANEL (FORM) ── */}
      <div className="relative flex w-full flex-col bg-white p-6 lg:w-[55%] lg:p-12 dark:bg-neutral-900 min-h-[600px] justify-center items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {!isStudent ? (
            <motion.div 
              key="inactive" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col items-center text-center max-w-sm mx-auto my-auto space-y-6"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-neutral-50 text-neutral-300 dark:bg-neutral-800/50 dark:text-neutral-600 shadow-inner">
                <School size={40} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Rejoignez l'élite étudiante</h3>
                <p className="mt-2 text-sm text-neutral-500 leading-relaxed">Activez votre pôle étudiant pour configurer votre établissement, vos préférences de recherche et vous démarquer.</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggleStudent(true)}
                disabled={toggling}
                className="group relative inline-flex h-12 items-center gap-2 rounded-full bg-neutral-900 px-8 text-sm font-bold text-white overflow-hidden shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 dark:bg-white dark:text-neutral-900"
              >
                <div className="absolute inset-0 w-1/4 bg-white/20 skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <GraduationCap size={16} />
                {toggling ? "Activation..." : "Activer maintenant"}
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="active" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }} 
              className="flex w-full flex-col space-y-8 pb-4"
            >
              
              {/* ── ÉTAT CIVIL & ÉTUDES ── */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <Building2 size={16} />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">Académie</h3>
                </div>
                
                <div className="grid gap-2 pl-11">
                  <InlineField label="Établissement" value={schoolName} onChange={setSchoolName} placeholder="Université de Bangui..." icon={(<></>)} />
                  <InlineField label="Filière" value={fieldOfStudy} onChange={setFieldOfStudy} placeholder="Informatique, Droit..." icon={(<></>)} isLast />
                </div>
              </div>

              {/* ── CURSUS ── */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                    <BookOpen size={16} />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">Niveau actuel</h3>
                </div>
                <div className="pl-11 space-y-4">
                  <div>
                    <SubLabel>Diplôme</SubLabel>
                    <PillRow options={STUDY_LEVELS} value={studyLevel} onChange={setStudyLevel} color="purple" />
                  </div>
                  <div>
                    <SubLabel>Année Validée</SubLabel>
                    <PillRow options={SCHOOL_YEARS} value={schoolYear} onChange={setSchoolYear} color="purple" />
                  </div>
                </div>
              </div>

              {/* ── RECHERCHE ── */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Layers size={16} />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">Cible & Préférences</h3>
                </div>
                
                <div className="pl-11 space-y-4">
                  <SearchModeToggles value={searchMode} onChange={setSearchMode} />

                  <AnimatePresence initial={false}>
                    {hasActivity && (
                      <motion.div variants={subExpandVariants} initial="hidden" animate="visible" exit="exit" className="overflow-hidden">
                        <div className="space-y-4 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-5 dark:border-neutral-800 dark:bg-neutral-900/30 shadow-inner">
                          
                          <div>
                            <SubLabel>Dès le</SubLabel>
                            <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-300">
                              <Calendar size={14} className="text-blue-500" />
                              <input type="date" value={internshipStart} onChange={(e) => setInternshipStart(e.target.value)} className="flex-1 bg-transparent text-sm font-medium text-neutral-700 outline-none dark:text-neutral-300" />
                            </div>
                          </div>

                          {showDuration && (
                            <div>
                              <SubLabel>Durée Optimale</SubLabel>
                              <PillRow options={INTERNSHIP_DURATIONS} value={internshipDuration} onChange={setInternshipDuration} color="secondary" />
                            </div>
                          )}

                          <div>
                            <SubLabel>Format Souhaité</SubLabel>
                            <PillRow options={INTERNSHIP_MODES} value={internshipMode} onChange={setInternshipMode} color="purple" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ── SUMMARY ── */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 shrink-0">
                    <FileText size={16} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mt-1.5 flex justify-between items-center w-full">
                      Pitch Impactant
                      <span className="text-[10px] font-medium text-neutral-400 normal-case bg-neutral-100 px-2 py-0.5 rounded-full dark:bg-neutral-800">{description.length} / 600 max</span>
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Ce message accompagne votre profil et marque la différence immédiate.</p>
                  </div>
                </div>

                <div className="pl-11 relative group">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Écrivez 2-3 phrases sur vos motivations, votre spécialité et pourquoi une entreprise devrait vous faire confiance..."
                    rows={4}
                    maxLength={600}
                    className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 shadow-sm transition-all focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-500/10 outline-none dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-200 dark:focus:bg-neutral-900"
                  />
                  
                  <button type="button" disabled className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100 px-5 py-2.5 text-xs font-bold text-rose-600 transition-all opacity-70 cursor-not-allowed dark:bg-none dark:border-rose-900/30 dark:bg-neutral-900 dark:text-rose-400">
                    <Sparkles size={14} className="animate-pulse" />
                    Bientôt : AI Pitch Writer (Phase IA)
                  </button>
                </div>
              </div>

              {/* ── ACTIONS ── */}
              <div className="flex items-center justify-between gap-4 border-t border-neutral-100 pt-6 mt-4 dark:border-neutral-800 pl-11">
                <div className="min-w-0 flex-1">
                  <AnimatePresence mode="wait">
                    {saved && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-xs font-bold text-green-600 dark:text-green-400">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        Modifications enregistrées !
                      </motion.div>
                    )}
                    {error && !saved && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs font-bold text-error-500">
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-neutral-900 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-neutral-800 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-purple-600 dark:hover:bg-purple-700"
                >
                  <Save size={16} />
                  {saving ? "Enregistrement..." : "Sauvegarder"}
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
\`;

const startIndex = content.indexOf('  // ── Render ─');
const newContent = content.substring(0, startIndex) + newRender;
fs.writeFileSync('src/components/dashboard/student/StudentSectionCard.tsx', newContent);
console.log('Done!');
