import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CardsChoise from './pages/CardsChoise'
import SelectedRecomendations from './pages/SelectedRecomendations'
import SummaryRecomendatinos from './pages/SummaryRecomendatinos'
import Header from './components/Header'

function App() {
	
	return (
		<Router>
			
			<Header/>

			<Routes>
				<Route path="/" element={<CardsChoise />} />
				<Route path="/recommendations" element={<SelectedRecomendations />} />
				<Route path="/summary" element={<SummaryRecomendatinos />} />
			</Routes>
		</Router>
	)
}

export default App
