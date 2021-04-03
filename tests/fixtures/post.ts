import Fixture from './fixture-model'

const Post1 = {
	title: 'Fermentum malesueada suspendisse leectus hac',
	sub_title: 'Taciti primis faucibus tempus rhoncus orci dis ultrices magna tortor ac',
	author: 'User test',
	src_background: 'url//ima',
	alt_background: 'alt-text',
	img_author: 'Ph / Ilustrator',
	brief_header: 'Ridiculus ornare cras integer',
	article:
		'Lorem ipsum dolor sit amet consectetur adipiscing elit, venenatis curae cras lacinia sodales fringilla massa, cubilia mi congue vestibulum arcu ligula. Ridiculus ornare cras integer ultricies dignissim massa ante lobortis urna fames arcu sed, posuere nulla nam ullamcorper sociis sem erat libero lacus mattis taciti. Eget nisl sapien convallis nulla habitant mollis vulputate, fringilla varius accumsan volutpat leo magnis, vitae et id donec porttitor vel.Vehicula mus pellentesque a luctus nullam morbi, litora potenti malesuada cum accumsan nisi aliquam, praesent sociis mi magnis facilisis. Taciti primis faucibus tempus rhoncus orci dis ultrices magna tortor ac, iaculis himenaeos pulvinar egestas porta cursus curabitur tellus maecenas, aliquam arcu vitae imperdiet lacinia proin scelerisque sollicitudin hendrerit. Ante nunc nisi in dictumst bibendum tempus quam est netus, ac facilisis vulputate semper sed mattis duis turpis porttitor velit, dis metus et tellus natoque felis volutpat diam.',
	is_deleted: false,
	is_draft: false,
	updated_at: new Date(),
	created_at: new Date()
}

const Post2 = {
	title: 'Fermentum malesuada suspendisse lewectus hac',
	sub_title: 'Taciti primis faucibus tempus rhoncus orci dis ultrices magna tortor ac',
	author: 'User test',
	src_background: 'url//ima',
	alt_background: 'alt-text',
	img_author: 'Ph / Ilustrator',
	brief_header: 'Ridiculus ornare cras integer',
	article:
		'Lorem ipsum dolor sit amet consectetur adipiscing elit, venenatis curae cras lacinia sodales fringilla massa, cubilia mi congue vestibulum arcu ligula. Ridiculus ornare cras integer ultricies dignissim massa ante lobortis urna fames arcu sed, posuere nulla nam ullamcorper sociis sem erat libero lacus mattis taciti. Eget nisl sapien convallis nulla habitant mollis vulputate, fringilla varius accumsan volutpat leo magnis, vitae et id donec porttitor vel.Vehicula mus pellentesque a luctus nullam morbi, litora potenti malesuada cum accumsan nisi aliquam, praesent sociis mi magnis facilisis. Taciti primis faucibus tempus rhoncus orci dis ultrices magna tortor ac, iaculis himenaeos pulvinar egestas porta cursus curabitur tellus maecenas, aliquam arcu vitae imperdiet lacinia proin scelerisque sollicitudin hendrerit. Ante nunc nisi in dictumst bibendum tempus quam est netus, ac facilisis vulputate semper sed mattis duis turpis porttitor velit, dis metus et tellus natoque felis volutpat diam.',
	is_deleted: false,
	is_draft: false,
	updated_at: new Date(),
	created_at: new Date()
}

const Post3 = {
	title: 'Fermentum malesuada suspendisse lectus haaac',
	sub_title: 'Taciti primis faucibus tempus rhoncus orci dis ultrices magna tortor ac',
	author: 'User test',
	src_background: 'url//ima',
	alt_background: 'alt-text',
	img_author: 'Ph / Ilustrator',
	brief_header: 'Ridiculus ornare cras integer',
	article:
		'Lorem ipsum dolor sit amet consectetur adipiscing elit, venenatis curae cras lacinia sodales fringilla massa, cubilia mi congue vestibulum arcu ligula. Ridiculus ornare cras integer ultricies dignissim massa ante lobortis urna fames arcu sed, posuere nulla nam ullamcorper sociis sem erat libero lacus mattis taciti. Eget nisl sapien convallis nulla habitant mollis vulputate, fringilla varius accumsan volutpat leo magnis, vitae et id donec porttitor vel.Vehicula mus pellentesque a luctus nullam morbi, litora potenti malesuada cum accumsan nisi aliquam, praesent sociis mi magnis facilisis. Taciti primis faucibus tempus rhoncus orci dis ultrices magna tortor ac, iaculis himenaeos pulvinar egestas porta cursus curabitur tellus maecenas, aliquam arcu vitae imperdiet lacinia proin scelerisque sollicitudin hendrerit. Ante nunc nisi in dictumst bibendum tempus quam est netus, ac facilisis vulputate semper sed mattis duis turpis porttitor velit, dis metus et tellus natoque felis volutpat diam.',
	is_deleted: false,
	is_draft: false,
	updated_at: new Date(),
	created_at: new Date()
}

const Posts: any = Fixture.register('post', { Post1, Post2, Post3 })

export default Posts
