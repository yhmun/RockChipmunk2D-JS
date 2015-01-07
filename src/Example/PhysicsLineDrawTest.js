/** ----------------------------------------------------------------------------------
 *
 *      File            PhysicsLineDrawTest.js
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

// how long we construct a segment
var SEGMENT_UNIT_LENGTH 		= 10;
// fire degree
var FIRE_DEGREE 				= 45;
var FIRE_ANGLE  				= cc.degreesToRadians ( FIRE_DEGREE ); 
// ball's velocity apply
var BALL_VELOCITY_APPLY 		= 600;

var BALL_CONTACT_TEST_MASK 		= 0x01; 
var TARGET_CONTACT_TEST_MASK 	= 0x01; 

msw.PhysicsLineDrawTest = msw.BaseDemo.extend  
({
	onEnter:function ( ) 
	{
		this._super ( );	

		this._prePoint = cp.vzero;
		this._curPoint = cp.vzero;
		this._segment  = { p1: cp.vzero, p2: cp.vzero };
		this._segments = new Array ( );
		
		this._canvas = new cc.DrawNode ( );
		this.addChild ( this._canvas );

		var 	shooter = new cc.Sprite ( "res/egg.png" );
		shooter.setScale ( 0.4 );
		this._shooterBody = cc.PhysicsBody.createCircle ( shooter.getBoundingBox ( ).width / 2 );
		this._shooterBody.setDynamic ( false );
		shooter.setPhysicsBody ( this._shooterBody );
		shooter.setPosition ( cc.p ( 100, 100 ) );
		this.addChildEx ( shooter );

//		auto contactListener = EventListenerPhysicsContact::create();
//		contactListener->onContactBegin = CC_CALLBACK_1(PhysicsLineDrawTestScene::onContactBegin, this);
//		contactListener->onContactPreSolve = CC_CALLBACK_2(PhysicsLineDrawTestScene::onContactPreSolve, this);
//		contactListener->onContactPostSolve = CC_CALLBACK_2(PhysicsLineDrawTestScene::onContactPostSolve, this);
//		contactListener->onContactSeperate = CC_CALLBACK_1(PhysicsLineDrawTestScene::onContactSeperate, this);
//		_eventDispatcher->addEventListenerWithSceneGraphPriority(contactListener, this);

		this.generateTarget ( );
	},

	demo_info:function ( )
	{
		return "14 Physics Line Draw Test";
	},

	restartCallback:function ( sender )
	{
		var		scene = msw.PhysicsLineDrawTest.createScene ( );
		cc.director.runScene ( scene );
	},	

	fireBalls:function ( dt )
	{
		var 	cos = Math.cos ( FIRE_ANGLE );
		var 	sin = Math.sin ( FIRE_ANGLE );
		var 	ball = this.createBall ( cc.p ( this._shooterBody.getNode ( ).getPositionX ( ) + 50 * cos, this._shooterBody.getNode ( ).getPositionY ( ) + 50 * sin ), 6, cc.PhysicsMaterial ( 0.02, 0.5, 0.5 ) );
		this.addChildEx ( ball );
		ball.getPhysicsBody ( ).setContactTestBitmask ( BALL_CONTACT_TEST_MASK );

		var 	velocityX = BALL_VELOCITY_APPLY * cos;
		var 	velocityY = BALL_VELOCITY_APPLY * sin;
		ball.getPhysicsBody ( ).setVelocity ( cp.v ( velocityX, velocityY ) );		
	},

	generateTarget:function ( )
	{
		var 	target = new cc.Sprite ( "res/steroidtocat.png" );
		target.setScale ( 0.3 );
		this._targetBody = cc.PhysicsBody.createBox ( cc.size ( target.getBoundingBox ( ).width, target.getBoundingBox ( ).height ) );
		this._targetBody.setDynamic ( false );
		this._targetBody.setContactTestBitmask ( TARGET_CONTACT_TEST_MASK );
		target.setPhysicsBody ( this._targetBody );

		var 	posx = msw.rand ( ) % 600 + 200;
		var 	posy = msw.rand ( ) % 400 + 200;
		target.setPosition ( posx, posy );
		this.addChild ( target );
	},

	onContactBegin:function ( contact )
	{
	/*
		auto bodyA = contact.getShapeA()->getBody();
		auto bodyB = contact.getShapeB()->getBody();
		if (bodyA == _targetBody || bodyB == _targetBody)
		{
			auto target = (Sprite*)_targetBody->getNode();
			auto alpha = (target->getOpacity() - 10) <= 0 ? 0 : (target->getOpacity() - 10);
			target->setOpacity(alpha);
			if (alpha == 0)
			{
				target->removeFromParentAndCleanup(true);
				_targetBody = NULL;

				generateTarget();
			}
		}
*/
		return true;
	},

	onContactPreSolve:function ( contact, solve )
	{
		return true;
	},

	onContactPostSolve:function ( contact, solve )
	{
	    
	},

	onContactSeperate:function ( contact )
	{
	    
	},

	onTouchBegan:function ( touch, event )
	{
		var 	location = touch.getLocation ( );
	    this._prePoint = this._curPoint = location;
	    
	    if ( this._shooterBody.getFirstShape ( ).containsPoint ( location ) )
	    {
	        this.schedule ( this.fireBalls, 0.1 );
	    }
	    return true;
	},

	onTouchMoved:function ( touch, event )
	{
	    var 	location = touch.getLocation ( );
	    this.drawPath ( location );
	},

	onTouchEnded:function ( touch, event )
	{
		this.unschedule ( this.fireBalls );
  
		var 	location = touch.getLocation ( );
	    this.drawPath ( location );
	    
	    for ( var i in this._segments )
	    {
	    	var		seg = this._segments [ i ];
	        var		lineBody = cc.PhysicsBody.createEdgeSegment ( seg.p1, seg.p2 );
	        var		edgeNode = new cc.Node ( );
	        edgeNode.setPhysicsBody ( lineBody );
	        this.addChildEx ( edgeNode );
	    }
	    this._segments.splice ( 0, this._segments.length );    
	},

	drawPath:function ( point )
	{
	    this._curPoint = point;
	    if ( cp.v.distsq ( point, this._prePoint ) > SEGMENT_UNIT_LENGTH * SEGMENT_UNIT_LENGTH )
	    {
	        this._segment.p1 = this._prePoint;
	        this._segment.p2 = this._curPoint;
	        this._segments.push ( this._segment );
	        
	        this._prePoint = cp.v ( this._curPoint.x, this._curPoint.y );
	    }
	    
	    for ( var i in this._segments )
	    {
	    	var		seg = this._segments [ i ];
	        this._canvas.drawSegment ( seg.p1, seg.p2, 2, cc.color ( 255, 255, 0, 150 ) );
	    }	    
	}
});

msw.PhysicsLineDrawTest.createScene = function ( )
{
    var 	scene = new cc.Scene ( );
    
    scene.initWithPhysics ( );
    scene.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
    scene.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -200 ) );
    
    var		layer = new msw.PhysicsLineDrawTest ( );
    layer.setPhysicWorld ( scene.getPhysicsWorld ( ) );
    scene.addChild ( layer );

    return scene;
};
