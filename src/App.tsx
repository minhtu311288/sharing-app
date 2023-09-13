import Header from "./components/Header"

export default function App() {
  return (
    <>
      <div className="min-h-full">
        <Header/>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
      </div>
    </>
  )
}
