import { useMemo } from "react"
import { useCryptoState } from "../store/store"
import Spinner from "./Spinner"

export default function CryptoPriceDisplay() {

    const result = useCryptoState((state) => state.result)
    const loading = useCryptoState((state) => state.loading)
    const hasResult = useMemo(() => !Object.values(result).includes(''), [result])

    return (
        <div className="result-wrapper">
            {loading? <Spinner/> :hasResult && (
                <>
                    <h2>Cotizacion</h2>
                    <div className="result">
                        <div>
                            <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="imagen CrYptomoneda" />
                        </div>
                        <div>
                            <p>El precio es de: <span>{result.PRICE}</span></p>
                            <p>Precio mas alto hoy: <span>{result.HIGHDAY}</span></p>
                            <p>Precio mas bajo hoy: <span>{result.LOWDAY}</span></p>
                            <p>Cambio en las ultimas 24 Hr: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Ultima actualizacion: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}
