const {  celebrate, Joi, Segments } = require('celebrate');//Validacoes

module.exports = {
    ongsCreate() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({ 
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.string().required().min(10).max(11),
                city: Joi.string().required(),
                uf: Joi.string().required().length(2)
            })
        })
    },
    incidentsIndex(){
        return celebrate({
            [Segments.QUERY]: Joi.object({ 
                page: Joi.number()
            }).unknown()
        })
    },
    incidentsDelete(){
        return celebrate({
            [Segments.PARAMS]: Joi.object({ 
                id: Joi.number().required()
            }).unknown()
        })
    },
    profileIndex(){
        return  celebrate({
            [Segments.HEADERS]: Joi.object({ 
                authorization: Joi.string().required()
            }).unknown()
        })
    }
}