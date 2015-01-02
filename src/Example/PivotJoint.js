/** ----------------------------------------------------------------------------------
 *
 *      File            PivotJoint.js
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





msw.PivotJoint = cc.Scene.extend 
({
	ctor:function ( ) 
	{
		this._super ( );

        this.space = new cp.Space();
        
        this.setupDebugNode();
        
        var	winSize = cc.winSize;

        var v = cp.v;
        
        var space = this.space;
        var staticBody = space.staticBody;

        // Walls
        var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(winSize.width,0), 0 ),               // bottom
            new cp.SegmentShape( staticBody, cp.v(0,winSize.height), cp.v(winSize.width,winSize.height), 0),    // top
            new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,winSize.height), 0),             // left
            new cp.SegmentShape( staticBody, cp.v(winSize.width,0), cp.v(winSize.width,winSize.height), 0)  // right
        ];
        for( var i=0; i < walls.length; i++ ) {
            var shape = walls[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            space.addStaticShape( shape );
        }

        // Gravity
        space.gravity = cp.v(0, -100);

        this.drawNode = new cc.DrawNode();
        this.addChild(this.drawNode, 10);

        if( 'mouse' in cc.sys.capabilities ) {
        	cc.eventManager.addListener({
        		event: cc.EventListener.MOUSE,
				onMouseMove: this.drawQuery
			}, this);
		}
		else if( 'touches' in cc.sys.capabilities ) {
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
				onTouchBegan:function(){
					return true;
				},
				onTouchMoved: this.drawQuery
			}, this);
		}

		var space = this.space;

		{ // add a fat segment
			var mass = 1;
			var length = 100;
			var a = v(-length/2, 0), b = v(length/2, 0);

			var body = space.addBody(new cp.Body(mass, cp.momentForSegment(mass, a, b)));
			body.setPos(v(320, 340));

			var shape = new cp.SegmentShape(body, a, b, 20);
			space.addShape(shape);
			
			
			
		}

		{ // add a static segment
			space.addShape(new cp.SegmentShape(space.staticBody, v(320, 540), v(620, 240), 0));
		}

		{ // add a pentagon
			var mass = 1;
			var NUM_VERTS = 5;

			var verts = new Array(NUM_VERTS * 2);
			for(var i=0; i<NUM_VERTS*2; i+=2){
				var angle = -Math.PI*i/NUM_VERTS;
				verts[i]   = 30*Math.cos(angle);
				verts[i+1] = 30*Math.sin(angle);
			}

			var body = space.addBody(new cp.Body(mass, cp.momentForPoly(mass, verts, v(0,0))));
			body.setPos(v(350+60, 220+60));

			space.addShape(new cp.PolyShape(body, verts, v(0,0)));
		}

		{ // add a circle
			var mass = 1;
			var r = 20;

			var body = space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, r, v(0,0))));
			body.setPos(v(320+100, 240+120));

			space.addShape(new cp.CircleShape(body, r, v(0,0)));
		}
	},

    setupDebugNode : function()
    {
        // debug only
        this._debugNode = new cc.PhysicsDebugNode(this.space );
        this._debugNode.visible = true ;
        this.addChild( this._debugNode );
    },
    
	drawBB: function(bb, fillColor, lineColor){
		this.drawNode.drawRect(cc.p(bb.l, bb.b), cc.p(bb.r, bb.t), fillColor, 1, lineColor);
	},

	drawQuery: function(touch, event){
		
		
		var target = !!event ? event.getCurrentTarget() : touch.getCurrentTarget();
		var drawNode = target.drawNode;
		drawNode.clear();

		var start = cc.p(320, 240);
		var end = touch.getLocation();
		drawNode.drawSegment(start, end, 1, cc.color(0, 255, 0, 255));

		//segmntQueryFirst
		var info = target.space.segmentQueryFirst(start, end, cp.ALL_LAYERS, cp.NO_GROUP);
		if(info) {
			var point = info.hitPoint(start, end);

            // Draw red over the occluded part of the query
            drawNode.drawSegment(point, end, 1, cc.color(255, 0, 0, 255));
            
            // Draw a little blue surface normal
            drawNode.drawSegment(point, cp.v.add(point, cp.v.mult(info.n, 16)), 1, cc.color(0, 255, 255, 255));
        }

        //segmentQuery
        target.space.segmentQuery(start, end, cp.ALL_LAYERS, cp.NO_GROUP, function(shape, t, n){
            //cc.log("segmentQuery" + shape);
            
        	cc.log ( shape + ", " + shape.c );
        });

        return;
        
        //nearestPointQueryNearest
        var nearestInfo = target.space.nearestPointQueryNearest(end, 100, cp.ALL_LAYERS, cp.NO_GROUP);
        if (nearestInfo) {
            drawNode.drawSegment(end, nearestInfo.p, 1, cc.color(255, 255, 0, 255));

            // Draw a red bounding box around the shape under the mouse.
            if(nearestInfo.d < 0) target.drawBB(nearestInfo.shape.getBB(), null, cc.color(255, 0, 0, 255));
        }

        //pointQuery
        target.space.pointQuery(end, cp.ALL_LAYERS, cp.NO_GROUP, function(shape){
            cc.log("pointQuery" + shape);
        });
        
        //nearestPointQuery
        target.space.nearestPointQuery(end, 100, cp.ALL_LAYERS, cp.NO_GROUP, function(shape, distance, point){
            cc.log("nearestPointQuery" + shape);
            cc.log("distance:" + distance);
            cc.log("nearest point:" + point.x + "," + point.y);
        });

        //bbQuery
        target.space.bbQuery(cp.bb(end.x-50, end.y-50, end.x+50, end.y+50), cp.ALL_LAYERS, cp.NO_GROUP, function(shape){
            cc.log("bbQuery" + shape);
        });
    }	
});
