const mongoose = require('mongoose');
const uri = 'mongodb+srv://ogribas:xidsNTpfwLGbecHm@gudang.psxfiqj.mongodb.net/';

mongoose.connect(uri);

const Parfum = mongoose.model('Parfum',{
    name: {
        type: String,
        required: true
    },
    harga: {
        type: String,
        required: true
    }
})


async function tampilSemua(){
    let data = await Parfum.find().then((d)=>{
        return d;
    })

    return data;
}




module.exports = {tampilSemua,Parfum};
