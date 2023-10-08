from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Cv
from .serializers import CvSerializer


class CvListApiView(APIView):
    # 1. List all
    def get(self, request, *args, **kwargs):
        '''
        List all the cv list
        '''
        cvs = Cv.objects.all()
        serializer = CvSerializer(cvs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        '''
        Create new cv with given data
        '''
        data = {
            'date': request.data.get('date'),
            'type': request.data.get('type'),
            'slug': request.data.get('slug'),
            'tags': request.data.get('tags'),
            'category': request.data.get('category'),
            'summary': request.data.get('summary'),
            'title': request.data.get('title'),
            'status': request.data.get('status'),
            'created_time': request.data.get('created_time'),
            'full_width': request.data.get('full_width'),
            'experience': request.data.get('experience'),
            'work_status': request.data.get('work_status')
        }
        serializer = CvSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        print(data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CvDetailApiView(APIView):
    def get_object(self, id):
        '''
        Helper method to get the object with given cv_id
        '''
        try:
            return Cv.objects.get(id=id)
        except Cv.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, id, *args, **kwargs):
        '''
        Retrieves the Todo with given id
        '''
        cv_instance = self.get_object(id)
        if not cv_instance:
            return Response(
                {"res": "Object with cv id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CvSerializer(cv_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 4. Update
    def put(self, request, id, *args, **kwargs):
        '''
        Updates the cv item with given id if exists
        '''
        cv_instance = self.get_object(id)
        if not cv_instance:
            return Response(
                {"res": "Object with cv id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = CvSerializer(
            instance=cv_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, id, *args, **kwargs):
        '''
        Deletes the cv item with given id if exists
        '''
        cv_instance = self.get_object(id)
        if not cv_instance:
            return Response(
                {"res": "Object with cv id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        cv_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )
