const child = require('child_process')

module.exports = (app) => {
    return {
        deleteRule: (req, res) => {
            deletes(req, res)
        }
    }
}

function deletes(req, res){
    try {

        const data = req.body
        const command = 'iptables -D ' + data.chain + ' ' + data.number
        
        child.exec(command, (error, stdout, stderr) => {
            
            if (error) {
                res.status(500).send({
                    ok: false,
                    message: 'Internal server error!',
                    error
                })
            }
    
            res.status(200).send({
                data: {
                    ok: true,
                    stdout,
                    stderr
                }
            })
        })
        
    } catch (error) {
        res.json({
            data: {
                ok: false,
                command,
                message: 'Internal server error!',
                error
            }
        })
    }
}