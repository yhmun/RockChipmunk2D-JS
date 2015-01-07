/** ----------------------------------------------------------------------------------
 *
 *      File            BaseDemo.js
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

var GRID_SPACE = 30;
var DRAG_BODYS_TAG = 0x80;

msw.BaseDemo = cc.LayerGradient.extend 
({
	ctor:function ( )
	{
		this._world = null;

		this._super ( cc.color ( 64, 64, 64, 255 ), cc.color ( 128, 128, 128, 255 ) );

		// Grid
		var 	bg_grid = new cc.DrawNode ( );			
		for ( var i = 0; i < cc.winSize.height; i += GRID_SPACE )
		{					
			bg_grid.drawSegment ( cc.p ( 0, i ), cc.p ( cc.winSize.width, i ), 0.5, cc.color ( 0, 0, 0, 128 ) );
		}

		for ( var i = 0; i < cc.winSize.width; i += GRID_SPACE )
		{
			bg_grid.drawSegment ( cc.p ( i, 0 ), cc.p ( i, cc.winSize.height ), 0.5, cc.color ( 0, 0, 0, 128 ) );
		}
		this.addChild ( bg_grid );		

		var		backMenuItem = new cc.MenuItemImage ( "res/backNormal.png", "res/backSelected.png", this.backCallback, this );
		var		restartMenuItem = new cc.MenuItemImage ( "res/refreshNormal.png", "res/refreshSelected.png", this.restartCallback, this );
		
		backMenuItem.setPosition ( cp.v.add ( VisibleRect.rightTop ( ), cp.v ( -200, -80 ) ) );
		restartMenuItem.setPosition ( cp.v.add ( backMenuItem.getPosition ( ), cp.v ( 90, 0 ) ) );
		
		var		menu = new cc.Menu ( backMenuItem, restartMenuItem );
		menu.setPosition ( 0, 0 );
		this.addChild ( menu, 300 );
	},
	
	onEnter:function ( )
	{
		this._super ( );
		
		var		demo_info_label = new cc.LabelTTF ( this.demo_info ( ), "Helvetica", 25 );
		demo_info_label.setAnchorPoint ( cc.p ( 0, 1.0 ) )
		demo_info_label.setPosition ( cp.v.add ( VisibleRect.leftTop ( ), cp.v ( 60, -60 ) ) );				
		this.addChild ( demo_info_label, 10 );    
		
		if ( !this._world )
		{
			return;
			
		}
		var 	size = VisibleRect.size ( );
		
		// Initialize Physics
		var 	body = cc.PhysicsBody.createEdgeBox ( size, cc.PHYSICSBODY_MATERIAL_DEFAULT, 5 );				
		this._wallNode = new cc.Node ( );
		body.setGroup ( 1 );
		this._wallNode.setPosition ( VisibleRect.left ( ).x + size.width / 2, VisibleRect.bottom ( ).y + size.height / 2 );
		this._wallNode.setPhysicsBody ( body );
		this.addChildEx ( this._wallNode );		
		
		cc.MenuItemFont.setFontSize ( 18 );
		var		toggleDebugMenuItem = new cc.MenuItemFont ( "Toggle debug", this.toggleDebugCallback, this );
		toggleDebugMenuItem.setPosition ( cp.v.add ( VisibleRect.rightTop ( ), cp.v ( -50, -10 ) ) );
		
		var		menu = new cc.Menu ( toggleDebugMenuItem );
		menu.setPosition ( 0, 0 );
		this.addChild ( menu, 300 );	
		
		this.mouses = new Array ( );
		cc.eventManager.addListener 
		({
			event : cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches : true,
			onTouchBegan : this.onTouchBegan.bind ( this ),
			onTouchMoved : this.onTouchMoved.bind ( this ),
			onTouchEnded : this.onTouchEnded.bind ( this )
		}, this );			
	},

	setPhysicWorld:function ( world )
	{
		this._world = world; 
	},
	
	demo_info:function ( )
	{
		return "demo_info";
	},

	onTouchBegan:function ( touch, event )
	{
		var 	location = touch.getLocation ( );
		var 	shapes   = this._world.getShapes ( location );

		for ( var i in shapes )
		{
			var		shape = shapes [ i ];
			var		body  = shape.getBody ( );
			if ( ( body.getTag ( ) & DRAG_BODYS_TAG ) != 0 )
			{
				var 	mouse = new cc.Node ( );
				mouse.setPhysicsBody ( cc.PhysicsBody.create ( cc.PHYSICS_INFINITY, cc.PHYSICS_INFINITY ) );
				mouse.getPhysicsBody ( ).setDynamic ( false );
				mouse.setPosition ( location );
				this.addChildEx ( mouse );

				var 	joint = cc.PhysicsJointPin.create ( mouse.getPhysicsBody ( ), body, location );
				joint.setMaxForce ( 5000.0 * body.getMass ( ) );
	    		this._world.addJoint ( joint );

	    		this.mouses.push ( { first: touch.getID ( ), second: mouse } );		       
	    		return true;
			}	    	
	    }

		return false;
	},	

	onTouchMoved:function ( touch, event )
	{
		for ( var i = 0; i < this.mouses.length; i++ )		
		{
			if ( this.mouses [ i ].first == touch.getID ( ) )
			{								
				this.mouses [ i ].second.setPosition ( touch.getLocation ( ) );
				break;
			}
		}
	},	

	onTouchEnded:function ( touch, event )
	{
		for ( var i = 0; i < this.mouses.length; i++ )		
		{
			if ( this.mouses [ i ].first == touch.getID ( ) )
			{
				this.removeChildEx ( this.mouses [ i ].second );
				this.mouses.splice ( i, 1 );
				i--;			
			}
		}		
	},	

	backCallback:function ( sender )
	{
		cc.director.runScene ( new msw.ContentScene ( ) );
	},

	restartCallback:function ( sender )
	{

	},	
	
	toggleDebugCallback:function ( sender )
	{
	    if ( this._world.getDebugDrawMask ( ) == cc.PhysicsWorld.DEBUGDRAW_ALL )
	    {
	    	this._world.setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_NONE );
	    }
	    else
	    {
	    	this._world.setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
	    }
	},		
	
	createBall:function ( point, radius, material )
	{		
		if ( material = undefined ) 	material = cc.PHYSICSBODY_MATERIAL_DEFAULT;
		
		var 	body = cc.PhysicsBody.createCircle ( radius, material );
		body.setTag ( DRAG_BODYS_TAG );
				
		var 	ball = new cc.Sprite ( "res/ball.png" );
		
		ball.setPhysicsBody ( body );
		ball.setPosition ( point );
		ball.setScale ( radius / ( ball.getContentSize ( ).width * 0.5 ) );
		
		return ball;
	},
	
	createBox:function ( point, size, material )
	{
		if ( material = undefined ) 	material = cc.PHYSICSBODY_MATERIAL_DEFAULT;
		
		var 	body = cc.PhysicsBody.createBox ( size );
		body.setTag ( DRAG_BODYS_TAG );
		
		var 	box = new cc.Sprite ( "res/YellowSquare.png" );
		var		box_size = box.getContentSize ( );
		
		box.setPhysicsBody ( body );
		box.setPosition ( point );
		box.setRotation ( cc.random0To1 ( ) * 360 );		
		box.setScale ( size.width / box_size.width, size.height / box_size.height );
		
		return box;
	},	
	
	createTriangle:function ( point, size, material )
	{
		if ( material = undefined ) 	material = cc.PHYSICSBODY_MATERIAL_DEFAULT;
		
	    var 	triangle = new cc.Sprite ( );
	    
	    var 	verts =
	    [
	        cp.v (               0,  size.height / 2 ),
	        cp.v (  size.width / 2, -size.height / 2 ),
	        cp.v ( -size.width / 2, -size.height / 2 )
	    ];
	    
	    var 	body = cc.PhysicsBody.createPolygon ( verts, material );
	    triangle.setPhysicsBody ( body );
	    triangle.setPosition ( point );
	    triangle.setRotation ( cc.random0To1 ( ) * 360 );
	    triangle.setTag ( DRAG_BODYS_TAG );
	    
	    return triangle;
	},
});