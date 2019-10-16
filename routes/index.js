var express = require('express');
var fetch = require('node-fetch');
var multiparty = require('multiparty');
var request = require('request');
var Busboy = require('busboy');
var fs = require('fs');
const cors = require('cors')
var router = express.Router();

const bodyParser = require('body-parser')

// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// )

// app.use(bodyParser.json())
router.post('/', cors({ origin: true }), function (req, res, next) {
  let form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.send(err);
    }
     
    request.post({
      url: 'https://api.remove.bg/v1.0/removebg',
      formData: {
        image_file: fs.createReadStream(files.image_file[0].path),
        size: fields.size,
        type: fields.type,
        roi: fields.roi,
        format: fields.format,
        crop: fields.crop,
        crop_margin: fields.crop_margin,
        scale: fields.scale,
        position: fields.position,
        channels: fields.channels,
        add_shadow: fields.add_shadow,
        bg_image_url: fields.bg_image_url
      },
      headers: {
        'X-API-Key': 'XRRuw3pBCY6YawEqFq38Qrm1',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      encoding: null
    }, function (error, response, body) {
      if (error) {        
        return res.send(error);
      }
      // if (response.statusCode !== 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
      //   fs.writeFileSync("no-bg1.png", body);
      // fs.writeFileSync("no-bg.png", body);
      return res.send(body);
    })    
  })  
  });

// router.post('/', cors({ origin: true }), function (req, res, next) {
//   // let form = new multiparty.Form();
//     var filesArray = Array();
//     // res.json({success: true, data: "hello"});
//     try {
//         var busboy = new Busboy({ headers: req.headers });
//         busboy.on('field', function(fieldname, val, valTruncated, keyTruncated) {
//             if (req.body.hasOwnProperty(fieldname)) {
//               if (Array.isArray(req.body[fieldname])) {
//                 req.body[fieldname].push(val);
//               } else {
//                 req.body[fieldname] = [req.body[fieldname], val];
//               }
//             } else {
//               req.body[fieldname] = val;
//             }
//         });
//         busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
//             let filename1 = Date.now() + '_' + filename;
//             var saveTo = path.join('.', 'files', filename1);
//             file.pipe(fs.createWriteStream(saveTo));
//             filesArray.push({
//                 field_name: fieldname,
//                 filename: filename1
//             })
//         });
//         busboy.on('finish', async function() {
//             var fields = req.body;

//             // fields.additionalFormItems = JSON.parse(fields.additionalFormItems);
//             // fields.additionalButtons = JSON.parse(fields.additionalButtons);
//             // for(var i=0; i < fields.categories.split(',').length; i++) {
//             //     let task = await new Task();
//             //     task.title = fields.title;
//             //     task.sub_title = fields.sub_title;
//             //     for(var j=0; j<fields.additionalFormItems.length; j++) {
//             //         for(var k=0; k<filesArray.length; k++) {
//             //             if(fields.additionalFormItems[j].type + '_' + j == filesArray[k].field_name) {
//             //                 fields.additionalFormItems[j].items = filesArray[k].filename
//             //             }
//             //         }
//             //     }
//             //     task.additional_form_items = fields.additionalFormItems;
//             //     task.additional_buttons = fields.additionalButtons;
//             //     task.category_id = fields.categories.split(',')[i];

//             //     await task.save();
//             // }
            
//             // let categories = await Category.find({
//             //     enterprise_id: req.user.id
//             // });

//             // for(var i=0; i<categories.length; i++) {
//             //     let tasks = await Task.find({category_id: categories[i]._id});
//             //     categories[i]['tasks'] = tasks;
//             // }

//             res.json({success: true, data: fields});
            
//         });
//         return req.pipe(busboy);
//     } catch (e) {
//         console.log(e)
//         res.json({ success: false, errors: { error: "Create Task Error" } });
//     }
// });


module.exports = router;
