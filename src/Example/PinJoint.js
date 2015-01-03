/** ----------------------------------------------------------------------------------
 *
 *      File            PinJoint.js
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

msw.PinJoint = msw.BaseScene.extend 
({
	ctor:function ( ) 
	{
		this._super ( );

		this.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -400 ) );
		
		var		Ball1 = this.createBall ( cc.p ( 100, 100 ), 50, cc.PHYSICSBODY_MATERIAL_DEFAULT );
		var		Ball2 = this.createBall ( cc.p ( 400, 100 ), 50, cc.PHYSICSBODY_MATERIAL_DEFAULT );
		
		var		Box1 = this.createBox ( cc.p ( 400, 200 ), cc.size ( 100, 100 ) );
		var		Box2 = this.createBox ( cc.p ( 600, 400 ), cc.size ( 100, 100 ) );
		
		this.addChild ( Ball1 );
		this.addChild ( Ball2 );
		
		this.addChild ( Box1 );
		this.addChild ( Box2 );		
		
	    var 	BallJoint = cc.PhysicsJointDistance.create ( Ball1.getPhysicsBody ( ), Ball2.getPhysicsBody ( ), cc.p ( 25, 0 ), cc.p ( -25,  0 ) );
	    var 	BoxJoint  = cc.PhysicsJointDistance.create ( Box1 .getPhysicsBody ( ), Box2 .getPhysicsBody ( ), cc.p (  0, 0 ), cc.p (  50, 50 ) );
	    this.getPhysicsWorld ( ).addJoint ( BallJoint );
	    this.getPhysicsWorld ( ).addJoint ( BoxJoint  );
	    
	    /*
	    Sprite* box = nullptr;
	    PhysicsJointDistance* chainJoint_distance = nullptr;
	    int chainLen = 10;
	    Vector<Sprite*> boxes;
	    for (int i = 0; i < chainLen; i++) {
	        box = createBox(Point(500 + 40 * i, 600), Size(20, 10));
	        this->addChild(box);
	        boxes.pushBack(box);
	        if (i == 0)
	        {
	            box->getPhysicsBody()->setDynamic(false);
	        }
	        if(i > 0)
	        {
	            chainJoint_distance = PhysicsJointDistance::construct(boxes.at(i-1)->getPhysicsBody(), boxes.at(i)->getPhysicsBody(), Point(10, 0), Point(-10, 0));
	            chainJoint_distance->setDistance(10);
	            _world->addJoint(chainJoint_distance);
	        }
	    }	    
	    */
	},
	
	demo_info:function ( )
	{
		return "02 Pin Joint";
	},

	restart:function ( Sender )
	{
		cc.director.runScene ( new msw.PinJoint ( ) );
	},	
});
