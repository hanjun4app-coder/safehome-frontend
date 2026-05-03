export default function Card({ children, title }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {title && <h2 className="text-lg font-semibold mb-4 text-gray-900">{title}</h2>}
      {children}
    </div>
  )
}
