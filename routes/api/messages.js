const router = require('express').Router();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { initStorage, initUpload } = require('../../modules/multerModule');

const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;

// Init gfs
let gfs;

const collectionName = 'messages';
const bucketName = 'messages';

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db);
  gfs.collection(collectionName);
});



const storage = initStorage(process.env.mongoURI, bucketName);

const upload = initUpload(storage);


// File Model
const Message = require('../../models/message');

// @route GET /
// @desc Loads form
router.get('/', (req, res) => {
  Message.find()
    .sort({ date: 1 })
    .then(messages => res.json(messages))
});


// @route POST /upload
// @desc  Uploads file and object to DB
router.post('/', upload.single('message'), (req, res) => {

  const fileImage = (req.body.fileImage == 'true');
  if (req.file !== undefined) {
    const { file } = req;
    const { id, filename } = file;
    const newMessage = new Message({
      files_id: id,
      email: req.body.email,
      fileImage: fileImage,
      path: '/api/messages/image/' + filename,
      content: req.body.content
      // Grab the file id that was stored in the database by the storage engine as the messages to your file
    })
    newMessage.save().then(messages => res.json(messages));
  }
  else {
    const newMessage = new Message({
      files_id: mongoose.Types.ObjectId(),
      email: req.body.email,
      path: req.body.path,
      fileImage: req.body.fileImage,
      content: req.body.content
      // Grab the file id that was stored in the database by the storage engine as the messages to your file
    })
    newMessage.save().then(messages => res.json(messages));
  }
});

// @route GET /files/:filename
// @desc  Display single file object
router.get('/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});

// @route GET /image/:filename
// @desc Display Image
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route DELETE /messages/:id
// @desc  Delete file and object
router.delete('/:id', async (req, res) => {
  const _id = req.params.id
  const oldMessage = await Message.findById(req.params.id);
  const { fileImage, files_id } = oldMessage;
  Message.findByIdAndDelete( _id , () => {
    if(fileImage){
      gfs.remove({ _id: files_id, root: 'messages' }, (err, gridFSBucket) => {
        if (err) {
          return res.status(404).json({ err: err });
        }
      });
    }
  })
  .then(() => res.json({ success: true }))
  .catch(err => res.status(404).json({ success: false }));
});

// @route PUT /messages/:id
// @desc  Update file and object
router.put('/:id', upload.single('message'), async (req, res) => {
  const _id = req.params.id;
  const oldMessage = await Message.findById(req.params.id);
  const { fileImage, files_id } = oldMessage;
  if (req.file !== undefined) {
    const newfileImage = (req.body.fileImage == 'true');
    const { file } = req;
    const { id, filename } = file;
    Message.findByIdAndUpdate( _id, {
      files_id: id,
      path: '/api/messages/image/' + filename,
      fileImage: newfileImage,
      content: req.body.content,
      modified_at: new Date()
    }, () => {
        if( fileImage ){
          gfs.remove({ _id: files_id, root: 'messages' }, (err, gridFSBucket) => {
            if (err) {
              return res.status(404).json({ err: err });
            }
          })
        }
      }
    )
    .then(messages => res.json(messages))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
  }
  else {

    if(req.body.fileImage){
      Message.findByIdAndUpdate(_id, {
        content: req.body.content,
        modified_at: new Date()
      })
      .then(messages => res.json(messages))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
    }
  else {
    Message.findByIdAndUpdate(_id, {
      content: req.body.content,
      fileImage: req.body.fileImage,
      modified_at: new Date(),
      path: req.body.path
      }, (err, user) =>{
        if(fileImage){
          gfs.remove({ _id: files_id, root: 'messages' }, (err, gridFSBucket) => {
            if (err) {
              return res.status(404).json({ err: err });
            }
          })
        } 
      })
    .then(messages => res.json(messages))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
  }

  }
});

module.exports = router;