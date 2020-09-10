const child = require('child_process')

module.exports = (app) => {
    return {
        getIptable: (req, res) => {
            getIptables(res)
        },
        getInterface: (req, res) => {
            getInterfaces(res)
        }
    }
}

function getIptables(res) {
    try {
        child.exec('iptables -L', (error, stdout, stderr) => {
            if (error) {
                res.status(500).send({
                    message: 'Internal server error!',
                    error
                })
            }

            res.status(200).send({
                data: {
                    stdout,
                    stderr
                }
            })
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error!',
            error
        })
    }
}

function getInterfaces(res) {
    try {
        const command = "/sbin/ip -4 -o a | cut -d ' ' -f 2,7 | cut -d '/' -f 1 | cut -d ' ' -f 1"
        child.exec(command, (error, stdout, stderr) => {
            if (error) {
                res.status(500).send({
                    message: 'Internal server error!',
                    error
                })
            }

            res.status(200).send({
                data: {
                    stdout: stdout.split('\n'),
                    stderr
                }
            })
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error!',
            error
        })
    }
}