export function Secondary ({ children, ...props }) {
  return (
    <button role="button" type="button" {...props} className="shadow-lg hover:bg-primary border border-green-700 pl-6 pr-6  pt-2 pb-2 mb-2 rounded-md">
      {children}
    </button>
  )
}
