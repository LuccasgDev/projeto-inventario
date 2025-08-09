export const resolveIdentifier = (model, identifier,field = "nome") => {
    const uuidRenger = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if(uuidRenger.test(identifier)){
        return model.findByPk(identifier)
    }

    const where = {}
    where[field] = identifier

    return model.findOne({where})
}