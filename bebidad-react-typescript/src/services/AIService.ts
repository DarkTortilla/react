import {streamText} from 'ai'
import { openrouter } from '../lib/ai'

export default {
    async generateRecipe( prompt:string ){
        const result = streamText({
            model:openrouter('meta-llama/llama-3.3-70b-instruct:free'),
            prompt,
            system:'eres un bartender con años de experiencia',
            temperature:1
        })
        return result.textStream
    } 
}