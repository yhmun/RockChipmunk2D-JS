/** ----------------------------------------------------------------------------------
 *
 *      File            PointQuery.js
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

var	ROTATE_LINE_LENGTH = 400;
var	LINE_COLOR = cc.color ( 0, 255, 255, 255 );
var DOT_COLOR  = cc.color ( 0, 255,   0, 255 );

msw.PointQuery = msw.BaseDemo.extend  
({
	onEnter:function ( ) 
	{
		this._super ( );			

		this._mode  = 0;
		this._angle = 0.0;

		this._node  = new cc.DrawNode ( );
		this.addChild ( this._node, 1 );

		cc.MenuItemFont.setFontSize ( 25 );
		var 	item = new cc.MenuItemFont ( "Change Mode(any)", this.changeModeCallback, this );		
		var 	menu = new cc.Menu ( item );
		menu.setPosition ( VisibleRect.left ( ).x + 150, VisibleRect.top ( ).y - 150 );
		this.addChild ( menu );

		this._bodyInfo = new cc.LabelTTF ( "", "Helvetica", 25 );	    
		this.addChild ( this._bodyInfo, 1000 );
		this._bodyInfo.setAnchorPoint ( cc.p ( 0, 0 ) );
		this._bodyInfo.setColor ( cc.color ( 255, 255, 255 ) );
		this._bodyInfo.setPosition ( cp.v.add ( VisibleRect.leftBottom ( ), cc.p ( 60, 60 ) ) );

		this.scheduleUpdate ( );	   
	},

	demo_info:function ( )
	{
		return "10 Point Query";
	},

	restartCallback:function ( sender )
	{
		var		scene = msw.PointQuery.createScene ( );
		cc.director.runScene ( scene );
	},	

	changeModeCallback:function ( sender )
	{
		this._mode = ( this._mode + 1 ) % 3;

		switch ( this._mode )
		{
		case 0 :	sender.setString ( "Change Mode(any)" );		break;
		case 1 :	sender.setString ( "Change Mode(nearest)" );	break;
		case 2 :	sender.setString ( "Change Mode(multiple)" );	break;
		}
	},

	update:function ( )
	{		
		var		point1 = VisibleRect.center ( );
		var 	d = cp.v ( ROTATE_LINE_LENGTH * Math.cos ( this._angle ), ROTATE_LINE_LENGTH * Math.sin ( this._angle ) );
		var 	point2 = cp.v.add ( point1, d );

		this._node.clear ( );
		this._bodyInfo.setString ( "" );
		
		switch ( this._mode )
		{
			case 0 :
				
				var 	point3 = cp.v ( point2.x, point2.y );
				
				var		func = function ( world, info, data )
				{
					data.x = info.contact.x;	
					data.y = info.contact.y;	
					
					var 	pos = info.shape.getBody ( ).getNode ( ).getPosition ( );					
					this._bodyInfo.setString ( "Pos : " + pos.x + ", " + pos.y );
					return false;
				};
				
				this._world.rayCast ( func.bind ( this ), point1, point2, point3 );
				this._node.drawSegment ( point1, point3, 1, LINE_COLOR );
	
				if ( !cp.v.eql ( point2, point3 ) )
				{
					this._node.drawDot ( point3, 5, DOT_COLOR );
				}				
				
				break;
		
			case 1 :
	
				var 	point3 = cp.v ( point2.x, point2.y );	
				var 	friction = 1.0;
				
				var		func = function ( world, info, data )
				{
					if ( friction > info.fraction )
					{
						point3 = info.contact;						
						friction = info.fraction;
					}
					
					return true;
				};
	
				this._world.rayCast ( func, point1, point2, null );
				this._node.drawSegment ( point1, point3, 1, LINE_COLOR );
	
				if ( !cp.v.eql ( point2, point3 ) )
				{
					this._node.drawDot ( point3, 5, DOT_COLOR );
				}	
				
				break;
		
			case 2 :

				var 	MAX_MULTI_RAYCAST_NUM = 5
				var 	points = new Array ( MAX_MULTI_RAYCAST_NUM );
				var 	num = 0;
	
				var		func = function ( world, info, data )
				{
					if ( num < MAX_MULTI_RAYCAST_NUM )
					{
						points [ num++ ] = info.contact;						
					}
					
					return true;
				};
				
				this._world.rayCast ( func, point1, point2, null );
				this._node.drawSegment ( point1, point2, 1, LINE_COLOR );
	
				for ( var i = 0; i < num; ++i )
				{
					this._node.drawDot ( points [ i ], 5, DOT_COLOR );
				}
	
				break;		
		}

		this._angle += cc.degreesToRadians ( 0.30 );
	},
	
	onTouchBegan:function ( touch, event )
	{
		return true;
	},
	
	onTouchEnded:function ( touch, event )
	{
		var 	location = touch.getLocation ( );
		var 	r = cc.random0To1 ( );
			
		if ( r < 1.0 / 3.0 )
		{
			this.addChildEx ( this.createBall ( location, cc.random0To1 ( ) * 10 + 30 ) );
		}
		else if ( r < 2.0 / 3.0 )
		{
			this.addChildEx ( this.createBox ( location, cc.size ( cc.random0To1 ( ) * 20 + 30, cc.random0To1 ( ) * 20 + 30 ) ) );
		}
		else
		{
			this.addChildEx ( this.createTriangle ( location, cc.size ( cc.random0To1 ( ) * 20 + 30, cc.random0To1 ( ) * 20 + 30 ) ) );
		}		
	},
});

msw.PointQuery.createScene = function ( )
{
    var 	scene = new cc.Scene ( );
    
    scene.initWithPhysics ( );
    scene.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
    scene.getPhysicsWorld ( ).setGravity ( cp.v ( 0, 0 ) );
    
    var		layer = new msw.PointQuery ( );
    layer.setPhysicWorld ( scene.getPhysicsWorld ( ) );
    scene.addChild ( layer );

    return scene;
};