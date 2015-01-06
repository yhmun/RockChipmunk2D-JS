/** ----------------------------------------------------------------------------------
 *
 *      File            ContactFilter.js
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

msw.ContactFilter = msw.BaseDemo.extend  
({
	onEnter:function ( ) 
	{
		this._super ( );		

		var		ball1 = this.createBall ( cc.p ( 100, 100 ), 50, cc.PHYSICSBODY_MATERIAL_DEFAULT );
		var		ball2 = this.createBall ( cc.p ( 400, 100 ), 50, cc.PHYSICSBODY_MATERIAL_DEFAULT );
		this.addChildEx ( ball1 );
		this.addChildEx ( ball2 );
		
		var		box1 = this.createBox ( cc.p ( 400, 200 ), cc.size ( 100, 100 ) );
		var		box2 = this.createBox ( cc.p ( 600, 400 ), cc.size ( 100, 100 ) );
		this.addChildEx ( box1 );
		this.addChildEx ( box2 );	
		
		var		ball1_body = ball1.getPhysicsBody ( );
		ball1_body.setCategoryBitmask 	 ( 0x01 );
		ball1_body.setContactTestBitmask ( 0x01 );
		ball1_body.setCollisionBitmask 	 ( 0x01 );
		ball1_body.setGroup ( 0 );
		
		var		ball2_body = ball2.getPhysicsBody ( );
		ball2_body.setCategoryBitmask 	 ( 0x01 );
		ball2_body.setContactTestBitmask ( 0x01 );
		ball2_body.setCollisionBitmask	 ( 0x01 );
		ball2_body.setGroup ( 0 );
		
		var		box1_body = box1.getPhysicsBody ( );
		box1_body.setCategoryBitmask  ( 0x02 );
		box1_body.setCollisionBitmask ( 0x04 );
		box1_body.setGroup ( 2 );
		
		var		box2_body = box2.getPhysicsBody ( );
//		box2_body.setCategoryBitmask ( 0x02 );
		box2_body.setGroup ( 2 );	
		
//	    auto contactListener = EventListenerPhysicsContactWithBodies::create(ball1_body, ball2_body);
//	    contactListener->onContactBegin = CC_CALLBACK_1(ContactFilterScene::onContactBegin, this);
//	    contactListener->onContactPreSolve = CC_CALLBACK_2(ContactFilterScene::onContactPreSolve, this);
//	    contactListener->onContactPostSolve = CC_CALLBACK_2(ContactFilterScene::onContactPostSolve, this);
//	    contactListener->onContactSeperate = CC_CALLBACK_1(ContactFilterScene::onContactSeperate, this);
//	    _eventDispatcher->addEventListenerWithSceneGraphPriority(contactListener, this);		
	},

	demo_info:function ( )
	{
		return "07 Contact Filter";
	},
	
	restartCallback:function ( sender )
	{
		var		scene = msw.ContactFilter.createScene ( );
		cc.director.runScene ( scene );
	},	
});

msw.ContactFilter.createScene = function ( )
{
    var 	scene = new cc.Scene ( );
    
    scene.initWithPhysics ( );
    scene.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
    scene.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -400 ) );
    
    var		layer = new msw.ContactFilter ( );
    layer.setPhysicWorld ( scene.getPhysicsWorld ( ) );
    scene.addChild ( layer );

    return scene;
};
