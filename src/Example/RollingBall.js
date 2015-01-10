/** ----------------------------------------------------------------------------------
 *
 *      File            RollingBall.js
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

var 	verts_egg = 
	[
	 1.9,  88.2,
	 41.8,  67.5,
	 64.1,  25.2,
	 66.3, -32.5,
	 44.5, -66.6,
	  0.8, -87.4,
	-44.1, -68.4,
	-62.6, -34.9,
	-62.1,  27.8,
	-39.7,  68.9
];

var		verts_cai = 
[			 
	  9.8,  51.9,
	 25.3,  46.1,
	 39.7,  40.3,
	 45.9,  29.3,
	 54.0,  15.0,
	 53.5,   2.6,
	 58.2, -18.7,
	 48.5, -27.6,
	 29.9, -23.0,
 	 16.4, -26.4,
	  6.7, -22.4,
	- 9.4, -29.6,
	-22.7, -41.8,
	-38.6, -56.6,
	-57.5, -42.0,
	-39.6, -24.0,
	-24.4,   4.2,
	-32.7,  13.1,
	-26.5,  27.3,
	-31.7,  40.6,
	-21.2,  56.7,
	- 2.3,  57.1,
];	

var		flip = false;

msw.RollingBall = msw.BaseDemo.extend 
({
	onEnter:function ( ) 
	{
		this._super ( );
	
		if ( flip )
		{
			this._verts_egg = new Array ( );
			this._verts_cai = new Array ( );
			
			for ( var i = 0; i < verts_egg.length; i += 2 )
			{
				this._verts_egg.push ( cp.v ( verts_egg [ i ], verts_egg [ i + 1 ] ) );
			}
			
			for ( var i = 0; i < verts_cai.length; i += 2 )
			{
				this._verts_cai.push ( cp.v ( verts_cai [ i ], verts_cai [ i + 1 ] ) );
			}			
			
			cc.log ( "Vertex Array" );
		}
		else
		{
			this._verts_egg = verts_egg;
			this._verts_cai = verts_cai;
			
			cc.log ( "Float Array" );
		}
		
		flip = !flip;
		
		var 	contactListener = new cc.EventListenerPhysicsContact ( );
		contactListener.onContactBegin 		= this.onContactBegin    .bind ( this );		
		contactListener.onContactPreSolve 	= this.onContactPreSolve .bind ( this );
		contactListener.onContactPostSolve 	= this.onContactPostSolve.bind ( this );
		contactListener.onContactSeperate 	= this.onContactSeperate .bind ( this );
		cc.eventManager.addCustomListener ( cc.PHYSICSCONTACT_EVENT_NAME, contactListener.onEvent.bind ( contactListener ) );		
	},
	
	demo_info:function ( )
	{
		return "02 Rolling Ball";
	},
	
	restartCallback:function ( sender )
	{
		cc.director.runScene ( msw.RollingBall.createScene ( ) );
	},
	
	onTouchBegan:function ( touch )
	{
		return true;
	},	
	
	onTouchEnded:function ( touch )
	{
		this.addNewSpriteAtPosition ( touch.getLocation ( ) );
	},		
	
	addNewSpriteAtPosition:function ( point )
	{
		var		randIdx = msw.rand ( ) % 3;
		var		sprite  = null;
		var		body    = null;
		
		switch ( randIdx )
		{
			case 0 :
				sprite = new cc.Sprite ( "res/egg.png" );				
				body = cc.PhysicsBody.createPolygon ( this._verts_egg, cc.PhysicsMaterial ( 0.1, 1.5, 1 ), cp.vzero );
				body.setContactTestBitmask ( 0x01 );		
				sprite.setTag ( 0 );
				break;
				
			case 1 :
				sprite = new cc.Sprite ( "res/cai1.png" );
				body = cc.PhysicsBody.createEdgePolygon ( this._verts_cai );
				body.setContactTestBitmask ( 0x01 );	
				sprite.setTag ( 1 );
				break;
				
			case 2 :
				sprite = new cc.Sprite ( "res/cai2.png" );
				body = cc.PhysicsBody.createCircle ( 55 );
				body.setContactTestBitmask ( 0x01 );
				sprite.setTag ( 2 );
				break;				
		}
		
		sprite.setPhysicsBody ( body );
		sprite.setPosition ( point );
	    this.addChildEx ( sprite );
	},
	
	onContactBegin:function ( contact )
	{
		var 	sprite  = contact.getShapeA ( ).getBody ( ).getNode ( );
		var 	sprite2 = contact.getShapeB ( ).getBody ( ).getNode ( );
		
		cc.log ( "onContactBegin: sprite1 tag:%d", sprite .getTag ( ) );
		cc.log ( "onContactBegin: sprite1 tag:%d", sprite2.getTag ( ) );
		
		return true;
	},

	onContactPreSolve:function ( contact, solve ) 
	{
//		cc.log ( "pre solve" );
		return true;
	},

	onContactPostSolve:function ( contact, solve ) 
	{
//		cc.log ( "post solve" );
	},

	onContactSeperate:function ( contact )
	{
//		cc.log ( "seperate solve" );
	},
});

msw.RollingBall.createScene = function ( )
{
	var 	scene = new cc.Scene ( );

	scene.initWithPhysics ( );
	scene.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
	scene.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -200 ) );

	var		layer = new msw.RollingBall ( );
	layer.setPhysicWorld ( scene.getPhysicsWorld ( ) );
	scene.addChild ( layer );

	return scene;
};
