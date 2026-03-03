import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { StudentSectionCard } from "@/components/dashboard/student/StudentSectionCard";
import type { StudentProfileValues, StudentProfileData } from "@/components/dashboard/student/StudentSectionCard";

export const metadata: Metadata = {
  title: "Stages & Alternance — KWATIGUIGUI",
  description: "Gérez votre profil étudiant, vos disponibilités pour les stages et alternances.",
  robots: { index: false, follow: false },
};

const DEFAULT_STUDENT: StudentProfileValues = {
  is_student:          false,
  school_name:         "",
  field_of_study:      "",
  study_level:         "",
  school_year:         "",
  internship_open:     false,
  alternance_open:     false,
  internship_start:    null,
  internship_duration: "",
  internship_mode:     "",
  student_description: "",
};

const DEFAULT_PROFILE: StudentProfileData = {
  first_name:  "",
  last_name:   "",
  city:        "",
  phone:       null,
  whatsapp:    "",
  avatar_url:  null,
  email:       "",
};

export default async function StudentPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) redirect("/login");

  let studentValues: StudentProfileValues = DEFAULT_STUDENT;
  let profileData: StudentProfileData     = { ...DEFAULT_PROFILE, email: user.email ?? "" };

  // Single query — fetches both student fields AND profile completeness fields
  const { data } = await supabase
    .from("profiles")
    .select(
      "is_student, school_name, field_of_study, study_level, school_year, internship_open, alternance_open, internship_start, internship_duration, internship_mode, student_description, first_name, last_name, city, phone, whatsapp, avatar_url",
    )
    .eq("id", user.id)
    .single();

  if (data) {
    studentValues = {
      is_student:          data.is_student          ?? false,
      school_name:         data.school_name         ?? "",
      field_of_study:      data.field_of_study      ?? "",
      study_level:         data.study_level         ?? "",
      school_year:         data.school_year         ?? "",
      internship_open:     data.internship_open     ?? false,
      alternance_open:     data.alternance_open     ?? false,
      internship_start:    data.internship_start    ?? null,
      internship_duration: data.internship_duration ?? "",
      internship_mode:     data.internship_mode     ?? "",
      student_description: data.student_description ?? "",
    };

    profileData = {
      first_name:  data.first_name  ?? "",
      last_name:   data.last_name   ?? "",
      city:        data.city        ?? "",
      phone:       data.phone       ?? null,
      whatsapp:    data.whatsapp    ?? "",
      avatar_url:  data.avatar_url  ?? null,
      email:       user.email       ?? "",
    };
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 w-full">
      {/* ── En-tête ──────────────────────────────────────────────────────── */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Stages &amp; Alternance
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Activez votre pôle étudiant pour apparaître dans les recherches de stages et d&apos;alternances.
        </p>
      </div>

      {/* ── Composant Pôle Étudiant ───────────────────────────────────────── */}
      <StudentSectionCard initialValues={studentValues} profileData={profileData} />
    </div>
  );
}
