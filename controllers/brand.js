import Brand from '../models/brand.js'

// get all brand
export const getBrand = async (req, res) => {
    try {
        const brand = await Brand.find()

        if (!brand.length) return res.status(404).json({ success: false, message: 'brand not found' })

        res.status(200).json({ brand })
    } catch (err) {
        console.log(err)
    }
}

// create a new brand
export const createBrand = async (req, res) => {
    try {
        const { title } = req.body
        if (!title) return res.status(400).json({ message: 'Invalid Title' })

        const existedBrand = await Brand.findOne({ title })
        if (existedBrand) return res.status(400).json({ message: 'Brand already exists' })

        const brand = await Brand.create({ title })

        res.status(201).json({ brand })
    } catch (err) {
        console.log(err)
    }
}

// delete a brand
export const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params
        const brand = await Brand.findOne({ _id: id })

        if (!brand) return res.status(404).json({ message: 'Not Found' })

        const deletedBrand = await Brand.findOneAndDelete({ _id: id })
        res.status(204).json({ message: 'Deleted', deletedBrand: deletedBrand })
    } catch (error) {
        console.log(error)
    }
}
