/** ----------------------------------------------------------------------------------
 *
 *      File            HitMe.js
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

msw.HitMe = msw.BaseDemo.extend  
({
	onEnter:function ( ) 
	{
		this._super ( );	
		
		this._bgColorLayer = new cc.LayerColor ( cc.color ( 0, 0, 0, 128 ) );
		this.addChild ( this._bgColorLayer );
		
		this._wallNode.getPhysicsBody ( ).setContactTestBitmask ( 0x000001 );
		
		this.setPhysicsForHitItem ( );	
		
		var 	contactListener = new cc.EventListenerPhysicsContact ( );
		contactListener.onContactBegin = this.onContactBegin.bind ( this );		
		cc.eventManager.addCustomListener ( cc.PHYSICSCONTACT_EVENT_NAME, contactListener.onEvent.bind ( contactListener ) );	
	},

	demo_info:function ( )
	{
		return "11 Hit Me";
	},
	
	restartCallback:function ( sender )
	{
		var		scene = msw.HitMe.createScene ( );
		cc.director.runScene ( scene );
	},	
	
	onTouchBegan:function ( touch, event )
	{
		if ( cc.rectContainsPoint ( this._hit.getBoundingBox ( ), touch.getLocation ( ) ) )
		{					
			return true;
		}
		
		return false;		
	},
	
	onTouchEnded:function ( touch, event )
	{
		this.hitMeFire ( );	
	},
	
	setPhysicsForHitItem:function ( )
	{
		this._hit = new cc.Sprite ( "res/HitMe/hit_me.png" );		
		var 	body = cc.PhysicsBody.createBox ( this._hit.getContentSize ( ), cc.PhysicsMaterial ( 0.3, 0.3, 0.3 ) );
	    body.setContactTestBitmask ( 0x000001 );	    
	    this._hit.setPhysicsBody ( body );
	    this._hit.setPosition ( VisibleRect.center ( ) );	    
	    this.addChildEx ( this._hit );
	},
	
	onContactBegin:function ( contact, target )
	{
		var 	randomColor = cc.color ( cc.random0To1 ( ) * 255, cc.random0To1 ( ) * 255, cc.random0To1 ( ) * 255 );
		this._bgColorLayer.setColor ( randomColor );
	    return true;
	},
	
	hitMeFire:function (  )
	{				
		var 	velocity_delta = cp.v.mult ( cp.v ( cc.random0To1 ( ), cc.random0To1 ( ) ), 300 );
		if ( cc.random0To1 ( ) < 0.5 ) 
		{
			velocity_delta = cp.v.neg ( velocity_delta );
		}
		
		var 	body = this._hit.getPhysicsBody ( );
	    body.setVelocity ( cp.v.add ( body.getVelocity ( ), velocity_delta ) );
	    body.setAngularVelocity ( body.getAngularVelocity ( ) + 5.0 * cc.random0To1 ( ) );	    
	}
});

msw.HitMe.createScene = function ( )
{
    var 	scene = new cc.Scene ( );
    
    scene.initWithPhysics ( );
    scene.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
    scene.getPhysicsWorld ( ).setGravity ( cp.v ( 0, 0 ) );
    
    var		layer = new msw.HitMe ( );
    layer.setPhysicWorld ( scene.getPhysicsWorld ( ) );
    scene.addChild ( layer );

    return scene;
};
