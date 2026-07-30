import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

/**
 * Static leadership data for the design phase.
 * In production this will be replaced by server-fetched member data.
 */
const leaders = [
  {
    id: "1",
    name: "Province Chairperson",
    position: "Province Committee Chair",
    district: "Kaski",
    photo: null, // Will be populated from CMS
  },
  {
    id: "2",
    name: "Vice Chairperson",
    position: "Province Vice Chair",
    district: "Syangja",
    photo: null,
  },
  {
    id: "3",
    name: "General Secretary",
    position: "Province General Secretary",
    district: "Parbat",
    photo: null,
  },
  {
    id: "4",
    name: "Secretary",
    position: "Province Secretary",
    district: "Baglung",
    photo: null,
  },
  {
    id: "5",
    name: "Treasurer",
    position: "Province Treasurer",
    district: "Tanahun",
    photo: null,
  },
];

function MemberAvatar({ photo, name }) {
  if (photo) {
    return (
      <div className="w-full h-full relative overflow-hidden group">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>
    );
  }

  // Editorial placeholder with initials
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#1546B0]/20 to-[#0D2E78]/40">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-2">
          <span className="text-white/70 text-2xl font-bold">{initial}</span>
        </div>
        <p className="text-white/30 text-xs">Photo Pending</p>
      </div>
    </div>
  );
}

export default function Leadership() {
  return (
    <section
      aria-labelledby="leadership-heading"
      className="bg-white dark:bg-[#0E1B34] py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <span className="text-[#1546B0] text-xs font-bold uppercase tracking-[0.25em] mb-4 block">
              Provincial Leadership
            </span>
            <h2
              id="leadership-heading"
              className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] dark:text-white leading-tight tracking-tight"
            >
              Those who serve Gandaki.
            </h2>
          </div>
          <div className="lg:text-right">
            <p className="text-[#475569] dark:text-[#94A3B8] text-base leading-relaxed mb-6">
              The Province Executive Committee leads NYFN Gandaki with
              accountability, dedication, and democratic representation.
            </p>
            <Link
              href="/en/committees/executive"
              className="inline-flex items-center gap-2 text-[#1546B0] dark:text-blue-400 font-bold text-sm uppercase tracking-wider hover:gap-4 transition-all duration-200 cursor-pointer"
            >
              View Full Committee
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal cinematic leadership row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {leaders.map((leader) => (
            <article
              key={leader.id}
              className="group flex flex-col"
            >
              {/* Portrait — tall aspect ratio */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#0D2E78] mb-4">
                <MemberAvatar photo={leader.photo} name={leader.name} />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081224]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <Link
                    href={`/en/members`}
                    className="inline-flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-wider hover:gap-3 transition-all cursor-pointer"
                  >
                    View Profile
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Text content */}
              <div>
                {/* Red accent */}
                <div className="h-0.5 w-6 bg-[#D71920] mb-3 rounded-full" />
                <h3 className="font-extrabold text-[#0F172A] dark:text-white text-sm sm:text-base leading-tight mb-1">
                  {leader.name}
                </h3>
                <p className="text-[#1546B0] text-xs font-semibold mb-1">
                  {leader.position}
                </p>
                <p className="text-[#6B7280] dark:text-[#64748B] text-xs font-medium uppercase tracking-wider">
                  {leader.district} District
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
