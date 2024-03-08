import axios, { AxiosRequestConfig } from "axios";

export class PokemonApi {
    private buildQuery = (method: AxiosRequestConfig['method'], params: any = {}, prefix: string): Promise<any> => {
        return axios({
            url: `https://pokeapi.co/api/v2/${prefix}`,
            method,
            data: params.data,
            params: params.params,
            ...(params || {}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    public findPokemon = (id: string, params: any): Promise<any> => {
        return this.buildQuery('get', params, `pokemon/${id}`);
    };

    public getPokemonTypes = (id?: string | undefined, params?: any): Promise<any> => {
        let prefix = 'type';
        if (id !== undefined) {
            prefix += `/${id}`;
        }
        return this.buildQuery('get', params, prefix);
    };

    public getPokeList = async (limit: number = 100, offset: number = 0): Promise<any[]> => {
        const params = { params: { limit, offset } };
        return this.buildQuery('get', params, 'pokemon');
    };
}
