<?php
/**
 * Plugin Name:       Sp First Dynamic
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       sp-first-dynamic
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function sp_first_dynamic_sp_first_dynamic_block_init() {
	register_block_type( 
		__DIR__ . '/build',
		array(
		'render_callback' => 'sp_first_dynamic_block_render_callback',
		) 
	);
}
add_action( 'init', 'sp_first_dynamic_sp_first_dynamic_block_init' );

/**
 * Renders the dynamic block based on the given block attributes and content.
 *
 * @param array $block_attributes The attributes of the block.
 * @param string $content The content inside the block.
 * @return string The rendered HTML content of the dynamic block.
 */
function sp_first_dynamic_block_render_callback( $block_attributes, $content ) {

	$recent_posts = wp_get_recent_posts( [
		'numberposts' => $block_attributes['postCount'],
		'post_status' => 'publish',
	] );

	if ( count( $recent_posts ) === 0 ) {
		return 'No posts';
	}

	ob_start();

	?> <h2> Lastest Posts </h2> <?php
	
	foreach( $recent_posts as $post ) {
		$post_id = $post['ID'];
		echo sprintf(
			'<li><a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a></li>',
			esc_url( get_permalink( $post_id ) ),
			esc_html( get_the_title( $post_id ) )
		);
	}

	return ob_get_clean();
}
