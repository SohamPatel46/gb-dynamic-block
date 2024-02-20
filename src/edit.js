/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { RangeControl } from '@wordpress/components';

import { useSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

	const { postCount } = attributes;

	const blockProps = useBlockProps();
	const posts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'post', { per_page: postCount } );
	}, [] );

	return (
		<div { ...blockProps }>

			<InspectorControls style={ { marginBottom: '20px' } }>
				<RangeControl
					label="Number of posts"
					value={ postCount }
					onChange={ ( value ) => setAttributes( { postCount: value } ) }
					min={ 1 }
					max={ 5 }
				/>
			</InspectorControls>

			<h2>Latest Posts</h2>
			<ul>
				{ ! posts && 'Loading' }
				{ posts && posts.length === 0 && 'No Posts' }
				{ posts && posts.length > 0 && (
					Object.keys( posts ).map( id => {
						return ( <li key={ posts[id].id }>
							<a href={ posts[id].link }>
								{ posts[id].title.rendered }
							</a>
						</li> );
					})
				) }
				
			</ul>
		</div>
	);
}
