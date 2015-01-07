/** ----------------------------------------------------------------------------------
 *
 *      File            SimplePlatformer.js
 *      Ported By       Young-Hwan Mun
 *      Contact         yh.msw9@gmail.com
 * 
 * -----------------------------------------------------------------------------------
 *   
 *      Created By      ChildhoodAndy on 14-3-9    
 *
 * -----------------------------------------------------------------------------------
 * 
 *      Permission is hereby granted, free of charge, to any person obtaining a copy
 *      of this software and associated documentation files (the "Software"), to deal
 *      in the Software without restriction, including without limitation the rights
 *      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *      copies of the Software, and to permit persons to whom the Software is
 *      furnished to do so, subject to the following conditions:
 * 
 *      The above copyright notice and this permission notice shall be included in
 *      all copies or substantial portions of the Software.
 * 
 *      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *      THE SOFTWARE.
 *
 * ----------------------------------------------------------------------------------- */ 

msw.SimplePlatformer = msw.BaseDemo.extend  
({
	onEnter:function ( ) 
	{
		this._super ( );		

		this._bodyNode = new cc.Node ( );
		this.addChildEx ( this._bodyNode );
		this._bodyNode.setPosition ( 100, 100 );

		this.addScrollingBackgroundWithTileMap ( );
		this.drawCollisionTiles ( );

		this._player = new msw.Player ( );
		this._player.setPosition ( 100.0, 300.0 );
		this._tileMapNode.addChildEx ( this._player );		
		
//		auto contactListener = EventListenerPhysicsContact::create();
//		contactListener->onContactBegin = CC_CALLBACK_1(SimplePlatformerScene::onContactBegin, this);

//		getEventDispatcher()->addEventListenerWithSceneGraphPriority(contactListener, this);
	},

	demo_info:function ( )
	{
		return "09 Simple Platformer";
	},

	restartCallback:function ( sender )
	{
		var		scene = msw.SimplePlatformer.createScene ( );
		cc.director.runScene ( scene );
	},	
		
	onContactBegin:function ( contact )
	{
		return true;
	},
	
	onTouchBegan:function ( touch, event )
	{
		var 	location = touch.getLocation ( );
		if ( location.x >= VisibleRect.center ( ).x )
		{
			this._player.moveRight ( );
		}
		else
		{
			this._player.jump ( );
		}
		return true;
	},

	makeBoxObjAt:function ( tile, size, dynamic, material )
	{
	    var 	body = cc.PhysicsBody.createEdgeBox ( size, material );
	    tile.setAnchorPoint ( cc.p ( 0.5, 0.5 ) );
		tile.setPhysicsBody ( body );		
	},
	
	drawCollisionTiles:function ( )
	{		
	    var 	collisionLayer = this._tileMapNode.getLayer ( "edgeLayer" );
	    var 	mapSize  = this._tileMapNode.getMapSize  ( );
	    var 	tileSize = this._tileMapNode.getTileSize ( );
	
	    for ( var i = 0; i < mapSize.width; i++ )
	    {
	        for ( var j = 0; j < mapSize.height; j++ )
	        {
	        	var 	tile = collisionLayer.getTileAt ( cc.p ( i, j ) );
	            if ( tile != null )
	            {	            	
	                property = this._tileMapNode.getPropertiesForGID ( collisionLayer.getTileGIDAt ( cc.p ( i, j ) ) );
	                var 	collidable = property [ "collidable" ];	               
	                if ( collidable )
	                {	                	
	                    var		pos = collisionLayer.getPositionAt ( cc.p ( i, j ) );
	                    this.makeBoxObjAt ( tile, tileSize, false, cc.PhysicsMaterial ( 0.2, 0.5, 0.5 ) );
	                }
	            }
	        }
	    }
	},
	
	addScrollingBackgroundWithTileMap:function ( )
	{
		this._tileMapNode = new cc.TMXTiledMap ( "res/SimplePlatformer/scroller.tmx" );
		this._tileMapNode.setAnchorPoint ( cc.p ( 0, 0 ) );
		this._tileMapNode.setPosition ( this._tileMapNode.getTileSize ( ).width / 2, this._tileMapNode.getTileSize ( ).height / 2 );
		this.addChild ( this._tileMapNode );
	}
});

msw.SimplePlatformer.createScene = function ( )
{
    var 	scene = new cc.Scene ( );
    
    scene.initWithPhysics ( );
    scene.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
    scene.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -200 ) );
    
    var		layer = new msw.SimplePlatformer ( );
    layer.setPhysicWorld ( scene.getPhysicsWorld ( ) );
    scene.addChild ( layer );

    return scene;
};

var	MOVE_SPEED = cp.v ( 10000.0, 0.0 );
var JUMP_SPEED = cp.v ( 0.0, 20000.0 );

msw.Player = cc.Sprite.extend
({
	ctor:function ( ) 
	{
		this._super ( );
		
		this.setTexture ( "res/YellowSquare.png" );

		this.setScale ( 0.5 );		
		
		var 	body = cc.PhysicsBody.createBox ( cc.size ( 50, 50 ), cc.PhysicsMaterial ( 0.1, 1.0, 0.8 ) );
		this.setPhysicsBody ( body );
	},
	
	jump:function ( )
	{
		this.getPhysicsBody ( ).applyForce ( MOVE_SPEED );
	},
	
	moveRight:function ( )
	{
		this.getPhysicsBody ( ).applyImpulse ( JUMP_SPEED );
	},
});
