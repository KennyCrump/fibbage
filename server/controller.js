module.exports ={
    getSession: (req, res) => {
        // console.log('session: ', req.session)
        res.status(200).send(req.session)
    },
    createSession: (req, res) => {
        console.log('func hit')
        let { room, name } = req.body
        req.session.name = name
        req.session.room = room
        res.status(200).send('hello')
    }
}