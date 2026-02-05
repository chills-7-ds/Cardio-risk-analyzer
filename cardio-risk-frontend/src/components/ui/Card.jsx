export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white/90 backdrop-blur-xl rounded-2xl
                  shadow-lg shadow-black/5 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
