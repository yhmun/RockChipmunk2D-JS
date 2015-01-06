/** ----------------------------------------------------------------------------------
 *
 *      File            SpringJoint.js
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

msw.SpringJoint = msw.BaseDemo.extend  
({
	onEnter:function ( ) 
	{
		this._super ( );				
	},

	demo_info:function ( )
	{
		return "05 Spring Joint";
	},
	
	restartCallback:function ( sender )
	{
		var		scene = msw.SpringJoint.createScene ( );
		cc.director.runScene ( scene );
	},	
});

msw.SpringJoint.createScene = function ( )
{
    var 	scene = new cc.Scene ( );
    
    scene.initWithPhysics ( );
    scene.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
    scene.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -200 ) );
    
    var		layer = new msw.SpringJoint ( );
    layer.setPhysicWorld ( scene.getPhysicsWorld ( ) );
    scene.addChild ( layer );

    return scene;
};
/*
ARROUND_BALLS_NUM 	  = 16;
ARROUND_BALLS_RADIUS  = 4.0;
CENTER_BALL_POS 	  = cc.p ( 200, 200 );
SOFT_BODY_RADIUS 	  = 100.0;

forAngle = function ( a )
{
	return cc.p ( Math.cos ( a ), Math.sin ( a ) );
}

msw.SpringJoint = msw.BaseScene.extend 
({
	ctor:function ( ) 
	{
		this._super ( );

		this.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -100 ) );

		// box1 box2 
		{
			var 	box1 = this.createBox ( cc.p ( 400, 200 ), cc.size ( 100, 100 ) );
			var 	box2 = this.createBox ( cc.p ( 600, 400 ), cc.size ( 40, 40 ) );
			this.addChild ( box1 );
			this.addChild ( box2 );
			
			box1.getPhysicsBody ( ).getFirstShape ( ).setFriction ( 0.0 );
			box2.getPhysicsBody ( ).getFirstShape ( ).setFriction ( 0.0 );

			var 	joint = cc.PhysicsJointSpring.create ( box1.getPhysicsBody ( ), box2.getPhysicsBody ( ), cc.p ( 0.5, 0.5 ), cc.p ( 0.5, 0.5 ), 1000.0, 0.8 );
			this.getPhysicsWorld ( ).addJoint ( joint );
		}

		{
			var 	centerBall = this.createBall ( CENTER_BALL_POS, SOFT_BODY_RADIUS );
			centerBall.getPhysicsBody ( ).setCategoryBitmask ( 0x02 );
			centerBall.getPhysicsBody ( ).setContactTestBitmask ( 0x01 );
			centerBall.getPhysicsBody ( ).setMass ( 1.0 / ARROUND_BALLS_NUM );
			this.addChild ( centerBall );

			
			var 	test = 2 * SOFT_BODY_RADIUS * Math.sin ( 2 * Math.PI / ARROUND_BALLS_NUM );
			var 	ballsArround = new Array ( );
			for ( var i = 0; i < ARROUND_BALLS_NUM; i++ )
			{
				var 	angle = 2 * Math.PI / ARROUND_BALLS_NUM * i;
				var 	pos  = cp.v.add ( CENTER_BALL_POS, cp.v.mult ( forAngle ( angle ), SOFT_BODY_RADIUS ) );
				var 	ball = this.createBall ( pos, test / 2 );
				ball.getPhysicsBody ( ).setMoment ( cc.PHYSICS_INFINITY );
				ball.getPhysicsBody ( ).setMass ( 1.0 / ARROUND_BALLS_NUM );
				ball.getPhysicsBody ( ).setCategoryBitmask ( 0x02 );
				ball.getPhysicsBody ( ).setContactTestBitmask ( 0x01 );
				ball.getPhysicsBody ( ).getFirstShape ( ).setFriction ( 1.0 );
				ball.getPhysicsBody ( ).getFirstShape ( ).setRestitution ( 0.5 );
				this.addChild ( ball );
				ballsArround.push ( ball );
				
				var 	body = ballsArround [ i ].getPhysicsBody ( );
				var 	limitJoint = cc.PhysicsJointLimit.create ( centerBall.getPhysicsBody ( ), body, cp.v.mult ( forAngle ( angle ), SOFT_BODY_RADIUS ), cp.vzero, 0, SOFT_BODY_RADIUS * 0.1 );				
				var		springJoint = cc.PhysicsJointSpring.create ( centerBall.getPhysicsBody ( ), body, cp.v.mult ( forAngle ( angle ), ( SOFT_BODY_RADIUS + test / 2 + 4 ) ), cc.p ( 0, 0 ), 60, 0.75 );

				springJoint.setRestLength ( 20 );
				this.getPhysicsWorld ( ).addJoint ( limitJoint );
				this.getPhysicsWorld ( ).addJoint ( springJoint );				
			}
						
			for ( var i = 0; i < ARROUND_BALLS_NUM; i++ )
			{
				var 	body = ballsArround [ i ].getPhysicsBody ( );
				var 	nextArroundBody = ballsArround [ ( i + 1 ) % ARROUND_BALLS_NUM ].getPhysicsBody ( );

				var 	arroundEachLimitJoint = cc.PhysicsJointLimit.create ( body, nextArroundBody, cp.vzero, cp.vzero, 0, test );
				this.getPhysicsWorld ( ).addJoint ( arroundEachLimitJoint );
			}

			centerBall.getPhysicsBody ( ).applyImpulse ( cc.p ( 400, 400 ) );			
		}		
	},

	demo_info:function ( )
	{
		return "05 Spring Joint";
	},

	restart:function ( Sender )
	{
		cc.director.runScene ( new msw.SpringJoint ( ) );
	},	
});
*/
