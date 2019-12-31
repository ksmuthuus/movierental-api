const express = require('express')

const router = express.Router()
//handle Invalid paths
router.get('*', (req, res) => {
    res.status(400).send({
        error: 'Invalid Request'
    })
})

router.put('*', (req, res) => {
    res.status(400).send({
        error: 'Invalid Request'
    })
})

router.delete('*', (req, res) => {
    res.status(400).send({
        error: 'Invalid Request'
    })
})

router.post('*', (req, res) => {
    res.status(400).send({
        error: 'Invalid Request'
    })
})

module.exports = router