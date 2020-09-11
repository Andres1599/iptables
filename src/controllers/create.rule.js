const child = require('child_process')

module.exports = (app) => {
    return {
        createRule: (req, res) => {
            create(req, res)
        }
    }
}

function create(req, res) {
    try {
        const data = req.body

        let command;

        if (data.chain != 'OUTPUT') {
            command = 'iptables -A ' + data.chain +
            ' -i ' + data.interfas + 
            ' -s ' + data.origen + 
            ' -p ' + data.protocol +
            ' -m multiport --dports ' + data.ports + 
            ' -j ' + data.destino
        } else {
            command = 'iptables -A ' + data.chain +
            ' -s ' + data.origen + 
            ' -p ' + data.protocol +
            ' -m multiport --dports ' + data.ports + 
            ' -j ' + data.destino
        }
        

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
                message: 'Internal server error!'
            }
        })
    } 
}