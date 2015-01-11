/** ----------------------------------------------------------------------------------
 *
 *      File            FruitCutNinja.js
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

msw.FruitCutNinja = msw.BaseDemo.extend  
({
	onEnter:function ( ) 
	{
		this._super ( );
		
		this._deltaRemainder = 0;
		this._sliceTag 		 = 1;		
		this._startPoint 	 = cp.vzero;
		this._endPoint	 	 = cp.vzero;
		this._startPos  	 = cp.vzero;		// Because Touch Bug
		this._blades		 = new Array ( );
		
		var		texture = cc.textureCache.addImage ( "res/FruitCutNinja/streak.png" );
		
	    for ( var i = 0; i < 3; i++ )
	    {
	        var	 	blade = new cc.Blade ( 50 );
	        blade.setAutoDim ( false );
	        blade.setTexture ( texture );
	        
	        this.addChild ( blade, 100 );
	        this._blades.push ( blade );
	    }	    
	    
		var 	box = new cc.Node ( );
		var 	points = [ cp.v ( -100, -100 ), cp.v ( -100, 100 ), cp.v ( 100, 100 ), cp.v ( 100, -100 ) ];
		box.setPhysicsBody ( cc.PhysicsBody.createPolygon ( points ) );
		box.setPosition ( VisibleRect.center ( ) );
		box.getPhysicsBody ( ).setTag ( this._sliceTag );	
		this.addChildEx ( box );			
	},

	demo_info:function ( )
	{
		return "13 Fruit Ninja Cut";
	},

	restartCallback:function ( sender )
	{
		var		scene = msw.FruitCutNinja.createScene ( );
		cc.director.runScene ( scene );
	},	

	slice:function ( world, info, data )
	{
		if ( info.shape.getBody ( ).getTag ( ) != this._sliceTag )
		{
			return true;
		}

		if ( !info.shape.containsPoint ( info.start ) && !info.shape.containsPoint ( info.end ) )
		{						
			var 	normal = cp.v.sub ( info.end, info.start );
			normal = cp.v.normalize ( cp.v.perp ( normal ) ); 
			var 	dist = cp.v.dot ( info.start, normal );

			this.clipPoly ( info.shape, normal, dist );
			this.clipPoly ( info.shape, cp.v.neg ( normal ), -dist );

			info.shape.getBody ( ).removeFromWorld ( );			
		}

		return true;
	},

	clipPoly:function ( shape, normal, distance )
	{	
		var 	body  = shape.getBody ( );
		var 	count = shape.getPointsCount ( );
		var 	pointsCount = 0;
		var 	points = new Array ( ); 		
		
		for ( var i = 0, j = count - 1; i < count; j = i, ++i )
		{				
			var 	a = body.local2World ( shape.getPoint ( j ) );
			var 	aDist = cp.v.dot ( a, normal ) - distance;

			if ( aDist < 0.0 )
			{
				points [ pointsCount ] = a;
				++pointsCount;
			}

			var 	b = body.local2World ( shape.getPoint ( i ) );
			var 	bDist = cp.v.dot ( b, normal ) - distance;

			if ( aDist * bDist < 0.0 )
			{
				var 	t = Math.abs ( aDist ) / ( Math.abs ( aDist ) + Math.abs ( bDist ) );
				points [ pointsCount ] = cp.v.lerp ( a, b, t );
				++pointsCount;
			}
		}
		
		var 	center = cc.PhysicsShape.getPolyonCenter ( points );
		var 	node   = new cc.Node ( );
		var 	polyon = cc.PhysicsBody.createPolygon ( points, cc.PHYSICSBODY_MATERIAL_DEFAULT, cp.v.neg ( center ) );		
		node.setPosition ( center );
		node.setPhysicsBody ( polyon );
		polyon.setVelocity ( body.getVelocityAtWorldPoint ( center ) );
		polyon.setAngularVelocity ( body.getAngularVelocity ( ) );
		polyon.setTag ( this._sliceTag );
		this.addChildEx ( node );
	},
	
	onTouchBegan:function ( touch, event )
	{
		var		location = touch.getLocation ( );
		this._startPoint = location;
		this._endPoint   = location;		
		this._startPos   = location;
		
        for ( var i in this._blades )
        {
        	var		blade = this._blades [ i ];
        	
            if ( blade.getPath ( ).length == 0 )
            {
                this._blade = blade;
                this._blade.push ( location );
                break;
            }
        }
		
		return true;
	},

	onTouchMoved:function ( touch, event )
	{
		var		location = touch.getLocation ( );
		this._endPoint = location;
		
		if ( cp.v.dist ( this._startPoint, this._endPoint ) > 25 )
		{
			this._startPoint = this._endPoint;
		}

		this._blade.push ( location );
	},
	
	onTouchEnded:function ( touch, event )
	{
		this._blade.setDim ( true );
		this._world.rayCast ( this.slice.bind ( this ), this._startPos, touch.getLocation ( ), null );
	}	
});

msw.FruitCutNinja.createScene = function ( )
{
    var 	scene = new cc.Scene ( );
    
    scene.initWithPhysics ( );
    scene.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
    scene.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -100 ) );
    
    var		layer = new msw.FruitCutNinja ( );
    layer.setPhysicWorld ( scene.getPhysicsWorld ( ) );
    scene.addChild ( layer );

    return scene;
};
