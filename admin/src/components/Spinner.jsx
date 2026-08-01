export default function Spinner({ size = "h-8 w-8" }) {
  return (
    <div className="flex items-center justify-center py-16">
      <div
        className={`${size} animate-spin rounded-full border-4 border-navy-200 border-t-gold-500`}
      />
    </div>
  );
}
