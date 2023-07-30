import slugfy from 'slugify'
import Category from '../models/category.js'

export const createNewCategory = async (name) => {
    const category = await Category.create({
        name,
        slug: slugfy(name),
    })

    return category
}
