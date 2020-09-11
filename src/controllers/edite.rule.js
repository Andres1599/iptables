const child = require('child_process')

module.exports = (app) => {
    return {
        update: (req, res) => {
            updateRule(req, res);
        }
    }
}

function updateRule(req, res) {
    try {
        const data = req.body

        let command;

        if (data.chain != 'OUTPUT') {
            command = 'iptables -R ' + data.chain + ' ' + data.number +
            ' -i ' + data.interfas + 
            ' -s ' + data.origen + 
            ' -p ' + data.protocol +
            ' -m multiport --dports ' + data.ports + 
            ' -j ' + data.destino
        } else {
            command = 'iptables -R ' + data.chain + ' ' + data.number +
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
                
                    ok: true,
                    stdout,
                    stderr
                
            })
        })

    } catch (error) {
        res.json({
            ok: false,
            command,
            message: 'Internal server error!'
        })
    }
}