const connection = require('../database/connection')

module.exports = {
    async create (request, response){
        const {  title,description,value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,description,value,ong_id
        });

        return response.json({ id })
    },
    async index (request,response){
        const { page = 1 } = request.query;//senao existir o valor de page ele será 1

        const [count] = await connection('incidents').count();

        /**
         * Primeira vez 
         * page = 1 => (1 - 1) => 0 * 5  Vai começar a partir do 0 e pegar os 5 primeiros registros
         * page = 2 => (2 - 1) => 1 * 5  Vai começar a partir do 5 Pulando os 5 anteriores e pegar os 5 proximos registros
        */
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id' , '=', 'incidents.ong_id')
            .limit( 5 )//Limitando a busca para 5
            .offset( (page - 1) * 5 ) 
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
        
        return response
            .header('X-Total-Count' , count['count(*)'] )
            .json( incidents );        
    },
    async delete (request,response){    
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        if( incidents.ong_id !== ong_id ){
            return response.status(401).json({ error: 'Operation not permitted' });
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();      
    },
};