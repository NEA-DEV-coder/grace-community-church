const staff = [
  {
    name: "Pastor David Thompson",
    role: "Lead Pastor",
    bio: "David has served Grace Community for over 15 years. He is passionate about expository preaching and seeing lives transformed by the gospel.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=774&auto=format&fit=crop",
  },
  {
    name: "Sarah Mitchell",
    role: "Worship Director",
    bio: "Sarah leads our worship ministry with a heart for authentic, Spirit-led praise. She believes worship is a lifestyle, not just a Sunday moment.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=774&auto=format&fit=crop",
  },
  {
    name: "Marcus Johnson",
    role: "Youth & Students Pastor",
    bio: "Marcus disciples the next generation, creating safe, engaging spaces where students can ask hard questions and grow in their faith.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=774&auto=format&fit=crop",
  },
  {
    name: "Emily Rodriguez",
    role: "Children’s Ministry Director",
    bio: "Emily oversees our kids’ programs, ensuring every child experiences the love of Jesus in a fun, nurturing, and secure environment.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=774&auto=format&fit=crop",
  },
  {
    name: "James Carter",
    role: "Executive Pastor",
    bio: "James oversees operations, finance, and community outreach — helping the church steward its resources faithfully for the Kingdom.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=774&auto=format&fit=crop",
  },
  {
    name: "Rachel Kim",
    role: "Community Outreach Lead",
    bio: "Rachel mobilizes volunteers to serve the city — from food drives to local partnerships — believing the church is at its best when it serves.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=774&auto=format&fit=crop",
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="bg-navy-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">
            Staff & Leadership
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-4 text-lg text-white/70">
            A dedicated team of pastors and leaders committed to shepherding our
            church family with love, wisdom, and integrity.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <div
              key={member.name}
              className="group overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-xl font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-gold-400">
                    {member.role}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-navy-600">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
