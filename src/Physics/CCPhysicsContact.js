/****************************************************************************
 Copyright (c) 2015 Young-Hwan Mun (yh.msw9@gmail.com)
 Copyright (c) 2013 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

cc.PhysicsContactData = cc.Class.extend
({
	ctor:function ( )
	{
		this.POINT_MAX = 4;
		
		this.points = new Array ( this.POINT_MAX )
		this.count  = 0;
		this.normal = cp.vzero;	
	},
});

cc.PHYSICSCONTACT_EVENT_NAME = "PhysicsContactEvent";

cc.PhysicsContact = cc.Class.extend
({
	ctor:function ( a, b )
	{		
		this._world 			 = null;
		this._shapeA			 = null;
		this._shapeB			 = null;
		this._eventCode			 = cc.PhysicsContact.EventCode.NONE;
		this._info				 = null;
		this._notificationEnable = true;
		this._result			 = true;
		this._data				 = null;
		this._contactInfo		 = null;
		this._contactData		 = null;
		this._preContactData	 = null;
		
		this.init ( a, b );
	},
	
	init:function ( a, b )
	{
		if ( a == null || b == null )
		{
			return false;
		}
		
		this._info = new cc.PhysicsContactInfo ( this );		
		this._shapeA = a;
		this._shapeB = b;
		
		return true;
	},
	
	/** get contact shape A. */
	getShapeA:function ( )  
	{
		return this._shapeA; 
	},
	
	/** get contact shape B. */
	getShapeB:function ( ) 
	{
		return this._shapeB; 
	},
	
	/** get contact data */
	getContactData:function ( ) 
	{
		return this._contactData; 
	},
	
	/** get previous contact data */
	getPreContactData:function ( ) 
	{
		return this._preContactData; 
	},
	
	/** get data. */
	getData:function ( ) 
	{
		return this._data; 
	},
	
	/**
	 * @brief set data to contact. you must manage the memory yourself, Generally you can set data at contact begin, and distory it at contact seperate.
	 */
	setData:function ( data ) 
	{
		this._data = data; 
	},
	
	/** get the event code */
	getEventCode:function ( ) 
	{
		return this._eventCode; 
	},	

	setEventCode:function ( eventCode )
	{
		this._eventCode = eventCode; 
	},
	
	isNotificationEnabled:function ( ) 
	{
		return this._notificationEnable; 
	},
	
	setNotificationEnable:function ( enable )
	{ 
		this._notificationEnable = enable; 
	},
	
	getWorld:function ( ) 
	{
		return this._world; 
	},
	
	setWorld:function ( world )
	{
		this._world = world; 
	},
	
	setResult:function ( result )
	{
		this._result = result;
	},
	
	resetResult:function ( )
	{
		var 	ret = this._result;
		this._result = true; 
		return ret; 
	},

	generateContactData:function ( )
	{
		if ( this._contactInfo == null )
		{
			return;
		}

		/*
		cpArbiter* arb = static_cast<cpArbiter*>(_contactInfo);
		CC_SAFE_DELETE(_preContactData);
		_preContactData = _contactData;
		_contactData = new (std::nothrow) PhysicsContactData();
		_contactData->count = cpArbiterGetCount(arb);
		for (int i=0; i<_contactData->count && i<PhysicsContactData::POINT_MAX; ++i)
		{
			_contactData->points[i] = PhysicsHelper::cpv2point(cpArbiterGetPoint(arb, i));
		}

		_contactData->normal = _contactData->count > 0 ? PhysicsHelper::cpv2point(cpArbiterGetNormal(arb, 0)) : Vec2::ZERO;		
		*/
	},
});

cc.PhysicsContact.EventCode =
{
	NONE 		: 0,
	BEGIN 		: 1,
	PRESOLVE 	: 2,
	POSTSOLVE 	: 3,
	SEPERATE 	: 4
};

/*
 * @brief presolve value generated when onContactPreSolve called.
 */
//class CC_DLL PhysicsContactPreSolve
//{
//	public:
		/** get restitution between two bodies*/
//		float getRestitution() const;
/** get friction between two bodies*/
//float getFriction() const;
/** get surface velocity between two bodies*/
//Vec2 getSurfaceVelocity() const;
/** set the restitution*/
//void setRestitution(float restitution);
/** set the friction*/
//void setFriction(float friction);
/** set the surface velocity*/
//void setSurfaceVelocity(const Vect& velocity);
/** ignore the rest of the contact presolve and postsolve callbacks */
//void ignore();

//private:
//	PhysicsContactPreSolve(void* contactInfo);
//~PhysicsContactPreSolve();

//private:
//	void* _contactInfo;

//friend class EventListenerPhysicsContact;
//};

/*
 * @brief postsolve value generated when onContactPostSolve called.
 */
/*
class CC_DLL PhysicsContactPostSolve
{
	public:
		/** get restitution between two bodies*/
//		float getRestitution() const;
/** get friction between two bodies*/
//float getFriction() const;
/** get surface velocity between two bodies*/
//Vec2 getSurfaceVelocity() const;

//private:
//	PhysicsContactPostSolve(void* contactInfo);
//~PhysicsContactPostSolve();

//private:
//	void* _contactInfo;

//friend class EventListenerPhysicsContact;
//};
//*/

/* contact listener. it will recive all the contact callbacks. */
/*
class CC_DLL EventListenerPhysicsContact : public EventListenerCustom
{
	public:
		/** create the listener */
//		static EventListenerPhysicsContact* create();
//virtual bool checkAvailable() override;
//virtual EventListenerPhysicsContact* clone() override;

//protected:
	/**
	 * it will be call when two body have contact.
	 * if return false, it will not invoke callbacks
	 */
//	virtual bool hitTest(PhysicsShape* shapeA, PhysicsShape* shapeB);

//public:
	/*
	 * @brief it will called at two shapes start to contact, and only call it once.
	 */
	//std::function<bool(PhysicsContact& contact)> onContactBegin;
	/*
	 * @brief Two shapes are touching during this step. Return false from the callback to make world ignore the collision this step or true to process it normally. Additionally, you may override collision values, restitution, or surface velocity values.
	 */
//	std::function<bool(PhysicsContact& contact, PhysicsContactPreSolve& solve)> onContactPreSolve;
	/*
	 * @brief Two shapes are touching and their collision response has been processed. You can retrieve the collision impulse or kinetic energy at this time if you want to use it to calculate sound volumes or damage amounts. See cpArbiter for more info
	 */
	//std::function<void(PhysicsContact& contact, const PhysicsContactPostSolve& solve)> onContactPostSolve;
	/*
	 * @brief it will called at two shapes separated, and only call it once.
	 * onContactBegin and onContactSeperate will called in pairs.
	 */
	//std::function<void(PhysicsContact& contact)> onContactSeperate;

//	protected:
//		bool init();
//	void onEvent(EventCustom* event);

//	protected:
//		EventListenerPhysicsContact();
//	virtual ~EventListenerPhysicsContact();

//	friend class PhysicsWorld;
//};
//*/

/** this event listener only be called when bodyA and bodyB have contacts */
/*
class CC_DLL EventListenerPhysicsContactWithBodies : public EventListenerPhysicsContact
{
	public:
		static EventListenerPhysicsContactWithBodies* create(PhysicsBody* bodyA, PhysicsBody* bodyB);

virtual bool hitTest(PhysicsShape* shapeA, PhysicsShape* shapeB) override;
virtual EventListenerPhysicsContactWithBodies* clone() override;

protected:
	PhysicsBody* _a;
PhysicsBody* _b;

protected:
	EventListenerPhysicsContactWithBodies();
virtual ~EventListenerPhysicsContactWithBodies();
};
*/

/** this event listener only be called when shapeA and shapeB have contacts */
/*
class CC_DLL EventListenerPhysicsContactWithShapes : public EventListenerPhysicsContact
{
	public:
		static EventListenerPhysicsContactWithShapes* create(PhysicsShape* shapeA, PhysicsShape* shapeB);

virtual bool hitTest(PhysicsShape* shapeA, PhysicsShape* shapeB) override;
virtual EventListenerPhysicsContactWithShapes* clone() override;

protected:
	PhysicsShape* _a;
PhysicsShape* _b;

protected:
	EventListenerPhysicsContactWithShapes();
virtual ~EventListenerPhysicsContactWithShapes();
};
*/

/** this event listener only be called when shapeA or shapeB is in the group your specified */
/*
class CC_DLL EventListenerPhysicsContactWithGroup : public EventListenerPhysicsContact
{
	public:
		static EventListenerPhysicsContactWithGroup* create(int group);

virtual bool hitTest(PhysicsShape* shapeA, PhysicsShape* shapeB) override;
virtual EventListenerPhysicsContactWithGroup* clone() override;

protected:
	int _group;

protected:
	EventListenerPhysicsContactWithGroup();
virtual ~EventListenerPhysicsContactWithGroup();
};

*/