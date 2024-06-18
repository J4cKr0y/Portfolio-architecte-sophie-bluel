const db = require('./../models');
const Categories = db.categories

exports.findAll = async (req, res) =>  {
	try{
		const works = await Categories.findAll();
		return res.status(200).json(works);
	}catch(err){
		return res.status(500).json({ error: new Error('Something went wrong')})
	}

}

exports.create = async (req, res) => {

	const category = await Categories.create({
		name : req.body.name
	})
	return res.status(201).json(category)
}

exports.delete = async (req, res) => {
	try{
		await Categories.destroy({where:{id: req.params.id}})
		return res.status(204).json({message: 'Category Deleted Successfully'})
	}catch(e){
		return res.status(500).json({error: new Error('Something went wrong')})
	}
}

exports.update = async (req, res) => {
	try{
		const category = await Categories.update(
			{name: req.body.name},
			{where: {id: req.params.id}}
		);
		return res.status(200).json({message: 'Category Updated Successfully', category})
	}catch(e){
		return res.status(500).json({error: new Error('Something went wrong')})
	}
}